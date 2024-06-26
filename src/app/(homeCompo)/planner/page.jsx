"use client";

import React, { useEffect, useState } from 'react';

const page = () => {
  const [itineraryData, setItineraryData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/generate-itinerary')
      .then(response => response.json())
      .then(data => setItineraryData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const sendItineraryInput = () => {
    const inputData = {
      destination: "OOty", // Replace with actual data or state
      preferences: "Site seeing", // Replace with actual data or state
      number_of_days: "10", // Replace with actual data or state
      budget: "10000" // Replace with actual data or state
    };

    fetch('http://localhost:8080/api/generate-itinerary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  // Call sendItineraryInput at an appropriate time, e.g., useEffect, button click, etc.

  return (
    <div>
      <h2>Itinerary Data</h2>
      <ul>
        {itineraryData.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default page;