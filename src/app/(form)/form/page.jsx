'use client';

import React, { use, useEffect, useState } from 'react';
import Head from 'next/head';
import { TextRevealCard } from "../../../components/ui/text-reveal-card";
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/myapi/getUserInfo';
import { LoadScript,Autocomplete,useLoadScript } from '@react-google-maps/api';
// import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const TripPlannerForm = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const router = useRouter();
    const [inputValue, setInputValue] = useState('');
    const [autocomplete, setAutocomplete] = useState(null);
    const [autocomplete1, setAutocomplete1] = useState(null);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [Dst, setDst]=useState('');
    const [inputValue2, setInputValue2]=useState('');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        source: '',
        destination: '',
        startDate: '',
        endDate: '',
        numberOfPeople: '',
        kidFriendly: false,
        museums: false,
        shopping: false,
        historical: false,
        outdoorAdventures: false,
        artAndCultural: false,
        amusementParks: false,
        budgetRange: '',
        days: 1,
    });
    
    const [errors, setErrors] = useState({});
    useEffect(()=>{
        const func=async()=>{
            const user =await getUserInfo();
            console.log(user);
        }
        func;
    },[]);
    useEffect(()=>{
        setFormData({
            ...formData,
            source: placeDetails
        })
    },[placeDetails])

    useEffect(()=>{
        setFormData({
            ...formData,
            destination: Dst
        })
    },[Dst])



    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading Maps</div>;
    }
    
    const validateStep1 = () => {
        let errors = {};
        if (!formData.source) errors.source = "Source is required";
        if (!formData.destination) errors.destination = "Destination is required";
        if (!formData.startDate) errors.startDate = "Start Date is required";
        if (!formData.endDate) errors.endDate = "End Date is required";
        if (!formData.numberOfPeople) {
            errors.numberOfPeople = "Number of People is required";
        } else if (formData.numberOfPeople <= 0) {
            errors.numberOfPeople = "Number of People must be greater than zero";
        } else if (formData.numberOfPeople < 0) {
            errors.numberOfPeople = "Number of People cannot be negative";
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (formData.startDate) {
            const startDate = new Date(formData.startDate);
            if (startDate < today) {
                errors.startDate = "Start Date must be today or in the future";
            }
        }

        if (formData.startDate && formData.endDate) {
            const startDate = new Date(formData.startDate);
            const endDate = new Date(formData.endDate);
            if (startDate >= endDate) {
                errors.endDate = "End Date must be after Start Date";
            } else if ((endDate - startDate) / (1000 * 60 * 60 * 24) > 14) {
                errors.endDate = "The trip cannot be longer than 14 days";
            }
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const validateStep2 = () => {
        let errors = {};
        if (!formData.budgetRange) errors.budgetRange = "Budget Range is required";
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const nextStep = () => {
        if (step === 1 && validateStep1()) {
            setStep(step + 1);
        } else if (step === 2 && validateStep2()) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hii my name")
        if (validateStep1() && validateStep2()) {
                        
            if (formData) {
                const startDate = formData.startDate; // Replace with your actual start date key
                const endDate = formData.endDate; // Replace with your actual end date key
                if (startDate && endDate) {
                  const numberOfDaysInclusive = calculateDaysInclusive(startDate, endDate);
                  setFormData(prevFormData => ({
                    ...prevFormData,
                    days: numberOfDaysInclusive,
                  }));
                  console.log(`Number of days inclusive: ${numberOfDaysInclusive}`);
                }
              }
            handleFormSubmit();
        }
    };

    const getProgressWidth = () => {
        switch (step) {
            case 1:
                return '50%';
            case 2:
                return '100%';
            default:
                return '50%';
        }
    };
    const calculateDaysInclusive = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const timeDifference = end.getTime() - start.getTime();
      return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
    };



    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            console.log({formData})
            const queryString = new URLSearchParams(formData).toString();
            router.push(`/map?data=${encodeURIComponent(JSON.stringify(formData))}`);
            console.log('came');
        } else {
            console.log('Form has errors');
        }
    };

    
    const handlePlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            const location = place.geometry.location;
            setInputValue(place.formatted_address || '');
            setPlaceDetails({
                address: place.formatted_address,
                lat: location.lat(),
                lng: location.lng(),
            });
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };
    const handlePlaceChanged2 = () => {
        if (autocomplete1 !== null) {
            const place = autocomplete1.getPlace();
            const location = place.geometry.location;
            setInputValue2(place.formatted_address || '');
            setDst({
                address: place.formatted_address,
                lat: location.lat(),
                lng: location.lng(),
            });
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    return (
        <>
    <Head>
    <title>Multi-Step Trip Planner</title>
    </Head>

    <div 
        className="bg-gray-900 flex flex-col items-center justify-center h-screen space-y-8 p-4"
        style={{
            backgroundImage: "url('C:\Users\visis\OneDrive\Desktop\next\Trip-Planner\public\courses\b.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}
    >
        {/* <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            libraries={['places']}
        ></LoadScript> */}
        {/* <TextRevealCard
            text="Plan Your Perfect Trip"
            revealText="Easily with our Form"
            className="max-w-xl w-100"
        /> */}
                <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-md">
                    <div id="progress-bar" className="w-full bg-gray-700 rounded-full mb-8">
                        <div id="progress" className="bg-purple-600 h-2 rounded-full" style={{ width: getProgressWidth() }}></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Step 1: Trip Details</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Source</label>
                                    <Autocomplete
                                            onLoad={(autocompleteInstance) => setAutocomplete(autocompleteInstance)}
                                            onPlaceChanged={handlePlaceChanged}
                                            fields={['geometry.location', 'formatted_address']}
                                    >
                                            {/* <input
                                                placeholder="Enter your address"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                /> */}
                                    <input
                                        type="text"
                                        name="source"
                                        // value={formData.source}
                                        // onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                    </Autocomplete>
                                    {errors.source && <p className="text-red-500">{errors.source}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Destination</label>
                                    {/* <input
                                        type="text"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                        /> */}
                                        <Autocomplete
                                            onLoad={(autocompleteInstance) => setAutocomplete1(autocompleteInstance)}
                                            onPlaceChanged={handlePlaceChanged2}
                                            fields={['geometry.location', 'formatted_address']}
                                    >
                                    <input
                                        type="text"
                                        name="destination"
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                        value={inputValue2}
                                        onChange={(e) => setInputValue2(e.target.value)}
                                    />
                                    </Autocomplete>
                                    {errors.destination && <p className="text-red-500">{errors.destination}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                    />
                                    {errors.startDate && <p className="text-red-500">{errors.startDate}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                    />
                                    {errors.endDate && <p className="text-red-500">{errors.endDate}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Number of People</label>
                                    <input
                                        type="number"
                                        name="numberOfPeople"
                                        value={formData.numberOfPeople}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                    />
                                    {errors.numberOfPeople && <p className="text-red-500">{errors.numberOfPeople}</p>}
                                </div>
                                <button type="button" onClick={nextStep} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                                    Next
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Step 2: Activity Preferences</h2>
                                <div className="mb-4">
                                    <label className="block text-white">Select Activities</label>
                                    <div className="text-white">
                                        <label>
                                            <input type="checkbox" name="kidFriendly" checked={formData.kidFriendly} onChange={handleChange} /> Kid Friendly
                                        </label>
                                    </div>
                                    <div className="text-white">
                                        <label>
                                            <input type="checkbox" name="museums" checked={formData.museums} onChange={handleChange} /> Museums
                                        </label>
                                    </div>
                                    <div className="text-white">
                                        <label>
                                            <input type="checkbox" name="shopping" checked={formData.shopping} onChange={handleChange} /> Shopping
                                        </label>
                                    </div>
                                    <div className="text-white">
                                        <label>
                                            <input type="checkbox" name="historical" checked={formData.historical} onChange={handleChange} /> Historical
                                        </label>
                                    </div>
                                    <div className="text-white">
                                        <label>
                                            <input type="checkbox" name="outdoorAdventures" checked={formData.outdoorAdventures} onChange={handleChange} /> Outdoor Adventures
                                        </label>
                                    </div>
                                    <div className="text-white">
                                        <label>
                                            <input type="checkbox" name="artAndCultural" checked={formData.artAndCultural} onChange={handleChange} /> Art & Cultural
                                        </label>
                                    </div>
                                    <div className="text-white">
                                        <label>
                                            <input type="checkbox" name="amusementParks" checked={formData.amusementParks} onChange={handleChange} /> Amusement Parks
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Budget Range</label>
                                    <div>
                                        <label className="inline-flex items-center ml-6">
                                            <input type="radio" name="budgetRange" value="low" checked={formData.budgetRange === 'low'} onChange={handleChange} className="form-radio text-purple-600" />
                                            <span className="ml-2 text-white">Low</span>
                                        </label>
                                        <label className="inline-flex items-center ml-6">
                                            <input type="radio" name="budgetRange" value="medium" checked={formData.budgetRange === 'medium'} onChange={handleChange} className="form-radio text-purple-600" />
                                            <span className="ml-2 text-white">Medium</span>
                                        </label>
                                        <label className="inline-flex items-center ml-6">
                                            <input type="radio" name="budgetRange" value="high" checked={formData.budgetRange === 'high'} onChange={handleChange} className="form-radio text-purple-600" />
                                            <span className="ml-2 text-white">High</span>
                                        </label>
                                    </div>
                                    {errors.budgetRange && <p className="text-red-500">{errors.budgetRange}</p>}
                                </div>
                                <button type="button" onClick={prevStep} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mr-4">
                                    Previous
                                </button>
                                <button type="button" onClick={nextStep} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                                    Next
                                </button>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Step 3: Review & Submit</h2>
                                <ul className="mb-4 text-gray-300">
                                    <li><strong>Source:</strong> {formData.source.address}</li>
                                    <li><strong>Destination:</strong> {formData.destination.address}</li>
                                    <li><strong>Start Date:</strong> {formData.startDate}</li>
                                    <li><strong>End Date:</strong> {formData.endDate}</li>
                                    <li><strong>Number of People:</strong> {formData.numberOfPeople}</li>
                                    <li><strong>Kid Friendly:</strong> {formData.kidFriendly ? 'Yes' : 'No'}</li>
                                    <li><strong>Museums:</strong> {formData.museums ? 'Yes' : 'No'}</li>
                                    <li><strong>Shopping:</strong> {formData.shopping ? 'Yes' : 'No'}</li>
                                    <li><strong>Historical:</strong> {formData.historical ? 'Yes' : 'No'}</li>
                                    <li><strong>Outdoor Adventures:</strong> {formData.outdoorAdventures ? 'Yes' : 'No'}</li>
                                    <li><strong>Art & Cultural:</strong> {formData.artAndCultural ? 'Yes' : 'No'}</li>
                                    <li><strong>Amusement Parks:</strong> {formData.amusementParks ? 'Yes' : 'No'}</li>
                                    <li><strong>Budget Range:</strong> {formData.budgetRange}</li>
                                </ul>
                                <button type="button" onClick={prevStep} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mr-4">
                                    Previous
                                </button>
                                <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700" onClick={handleFormSubmit}>
                                    Submit
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
};

export default TripPlannerForm;