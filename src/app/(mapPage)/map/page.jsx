"use client"

import React, { useEffect } from 'react';
import styles from './map.module.css';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import MapComponent from './map';
import GoogleMapReact from "google-map-react";


const Map = () => {
  useEffect(() => {
    // Fetch data from API
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="p-8 bg-black text-white">
      {/* Header */}
      <header className="mb-8">
        <nav className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h1 className="text-white text-xl">Header Bar</h1>
        </nav>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Side - Card Component */}
        <div className="md:col-span-4">
          <div className={`${styles.card} rounded-lg shadow-md overflow-hidden`}>
            <img
              src="https://media-cdn.tripadvisor.com/media/photo-o/0a/56/ff/7a/photo0jpg.jpg"
              alt="Birla Mandir"
              className={styles.cardImage}
            />
            <div className="p-4">
              <h2 className="text-xl mb-2 text-white">Birla Mandir</h2>
              <p className="text-gray-400 mb-2">Hyderabad, Telangana</p>
              <p className="text-gray-500 mb-4">Ranked #6 of 3515 things to do</p>
              <div className={`${styles.highlightBg} p-4 rounded-lg shadow-inner`}>
                <p className="text-white mb-4">
                  Birla Mandir is a Hindu temple, built on a 280 feet (85 m) high hillock called Naubath Pahad.
                </p>
                <a
                  href="https://www.tripadvisor.com/Attraction_Review-g297586-d1021934-Reviews-Birla_Mandir-Hyderabad_Hyderabad_District_Telangana.html"
                  className="text-blue-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Placeholder for Map */}
        <div className="md:col-span-8 map bg-gray-700 rounded-lg shadow-md h-100">
          <MapComponent />
        </div>
      </div>

      {/* Bottom - Placeholder for Drag and Drop UI */}
      <div className="mt-8">
        <h2 className="text-xl mb-4 text-white">Bucket List</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className={`${styles.bucketListItem} bg-gray-800 rounded-lg shadow-md p-4`}>
            Item 1
          </div>
          <div className={`${styles.bucketListItem} bg-gray-800 rounded-lg shadow-md p-4`}>
            Item 2
          </div>
          <div className={`${styles.bucketListItem} bg-gray-800 rounded-lg shadow-md p-4`}>
            Item 3
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Map;
