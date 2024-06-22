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

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
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
          revealText="Effortlessly with Our Multi-Step Form"
          className="max-w-xl w-100"
        />
        <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-md">
          <div id="progress-bar" className="w-full bg-gray-700 rounded-full mb-8">
            <div id="progress" className="bg-blue-500 h-2 rounded-full" style={{ width: getProgressWidth() }}></div>
          </div>
          <form>
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Step 1: Trip Details</h2>
                <div className="mb-4">
                  <label className="block text-gray-300">Destination</label>
                  <input type="text" className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300">Travel Date</label>
                  <input type="date" className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1" />
                </div>
                <button type="button" onClick={nextStep} className="bg-blue-500 text-white px-4 py-2 rounded">
                  Next
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Step 2: Accommodation</h2>
                <div className="mb-4">
                  <label className="block text-gray-300">Hotel Name</label>
                  <input type="text" className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1" />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300">Check-in Date</label>
                  <input type="date" className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded mt-1" />
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
                <p className="mb-4 text-gray-300">Please confirm your trip details and accommodation information.</p>
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
        </div>
      </div>
    </>
  );
};

export default function Home() {
  return <TripPlannerForm />;
}
