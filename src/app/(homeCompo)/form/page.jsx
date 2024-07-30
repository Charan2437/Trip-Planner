'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { TextRevealCard } from "../../../components/ui/text-reveal-card";
import { useRouter } from 'next/navigation';

const TripPlannerForm = () => {
    const router = useRouter();
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
        budgetRange: ''
    });

    const [errors, setErrors] = useState({});

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
        if (validateStep1() && validateStep2()) {
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
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            // No errors, proceed to redirect
            const queryString = new URLSearchParams(formData).toString();
            router.push(`/map?data=${encodeURIComponent(JSON.stringify(formData))}`);
        }else {
            // Errors found, do not redirect
            console.log('Form has errors');
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
        <TextRevealCard
            text="Plan Your Perfect Trip"
            revealText="Easily with our Form"
            className="max-w-xl w-100"
        />
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
                                    <input
                                        type="text"
                                        name="source"
                                        value={formData.source}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                    />
                                    {errors.source && <p className="text-red-500">{errors.source}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Destination</label>
                                    <input
                                        type="text"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                    />
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
                                    <li><strong>Source:</strong> {formData.source}</li>
                                    <li><strong>Destination:</strong> {formData.destination}</li>
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