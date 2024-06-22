'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import {
    TextRevealCard,
    TextRevealCardDescription,
    TextRevealCardTitle,
} from "../../components/ui/text-reveal-card";

const TripPlannerForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        destination: '',
        travelDate: '',
        numberOfDays: '',
        preference: '',
        budget: '',
        art: false,
        museums: false,
        outdoor: false,
        indoor: false,
        kids_friendly: false,
        young_people: false,
    });

    const [itinerary, setItinerary] = useState(null);

    const nextStep = () => {
        setStep(step + 1);
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

    //   if (step !== 3) return;
    //   if(!formData.destination || !formData.travelDate || !formData.numberOfDays || !formData.budget) {
    //     alert("Please fill all the fields");
    //     return;
    //   }
    //     console.log(formData);
    //     e.preventDefault();
    //     const response = await fetch('http://localhost:3000/api/generate_itinerary', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(formData)
    //     });
    //     const result = await response.json();
    //     console.log(result);
    //     setItinerary(result);
    };

    const getProgressWidth = () => {
        switch (step) {
            case 1:
                return '33%';
            case 2:
                return '66%';
            case 3:
                return '100%';
            default:
                return '33%';
        }
    };

    return (
        <>
            <Head>
                <title>Multi-Step Trip Planner</title>
            </Head>
            <div className="bg-gray-900 flex flex-col items-center justify-center h-screen space-y-8 p-4">
                <TextRevealCard
                    text="Plan Your Perfect Trip"
                    revealText="Easily with our Form"
                    className="max-w-xl w-100"
                />
                <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-md">
                    <div id="progress-bar" className="w-full bg-gray-700 rounded-full mb-8">
                        <div id="progress" className="bg-blue-500 h-2 rounded-full" style={{ width: getProgressWidth() }}></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Step 1: Trip Details</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Destination</label>
                                    <input
                                        type="text"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Travel Date</label>
                                    <input
                                        type="date"
                                        name="travelDate"
                                        value={formData.travelDate}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Number of Days</label>
                                    <input
                                        type="number"
                                        name="numberOfDays"
                                        value={formData.numberOfDays}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                    />
                                </div>
                                <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
                                    Next
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Step 2: Your Preference</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Select your Preference</label>
                                    <div>
                                        <label>
                                            <input type="checkbox" name="art" checked={formData.art} onChange={handleChange} /> Art
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="checkbox" name="museums" checked={formData.museums} onChange={handleChange} /> Museums
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="checkbox" name="outdoor" checked={formData.outdoor} onChange={handleChange} /> Outdoor Activities
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="checkbox" name="indoor" checked={formData.indoor} onChange={handleChange} /> Indoor Activities
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="checkbox" name="kids_friendly" checked={formData.kids_friendly} onChange={handleChange} /> Good for Kids
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input type="checkbox" name="young_people" checked={formData.young_people} onChange={handleChange} /> Good for Young People
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-300">Budget(In Rupees)</label>
                                    <input
                                        type="number"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">
                                        Previous
                                    </button>
                                    <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-4">Step 3: Confirmation</h2>
                                <p className="mb-4 text-gray-300">Please confirm your trip details and preferences.</p>
                                <div className="flex justify-between">
                                    <button type="button" onClick={prevStep} className="bg-gray-500 text-white px-4 py-2 rounded">
                                        Previous
                                    </button>
                                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                    {/* {itinerary && (
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Generated Itinerary</h2>
                            {itinerary.days.map((day, index) => (
                                <div key={index}>
                                    <h3 className="text-xl font-bold text-white">Day {day.day}</h3>
                                    {day.activities.map((activity, idx) => (
                                        <div key={idx} className="mb-4">
                                            <h4 className="text-lg font-bold text-white">{activity.title}</h4>
                                            <p className="text-gray-300">{activity.description}</p>
                                            <p className="text-gray-300">Location: <a href={activity.location} className="text-blue-400">{activity.location}</a></p>
                                            <p className="text-gray-300">Time: {activity.start_time} - {activity.end_time}</p>
                                            <p className="text-gray-300">Link: <a href={activity.link} className="text-blue-400">{activity.link}</a></p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )} */}
                </div>
            </div>
        </>
    );
};

export default function Home() {
    return <TripPlannerForm />;
}
