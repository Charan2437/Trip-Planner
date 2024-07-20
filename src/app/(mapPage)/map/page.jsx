"use client"

import React, { useEffect,useState } from 'react';
import styles from './map.module.css';
import 'tailwindcss/tailwind.css';
import axios from 'axios';
import MapComponent from './map';
import GoogleMapReact from "google-map-react";
// import App from '@/app/(dnd)/dnd/page';
import { lerp } from 'three/src/math/MathUtils.js';
import { root } from 'postcss';
import { useItemsStore } from '@/store/placeitems';
import DragDrop from '@/app/(dnd)/dnd/page';


const Map = () => {

  const [ListPlaces, setListPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const cardsData = [
      {
        id: 0,
        title: "All_Places",
        components: [
          {
            id: 100,
            name: "material ui"
          },
          {
            id: 200,
            name: "bootstrap"
          },
        ]
      },
      {
        id: 1,
        title: "Day 1",
        components: [
          {
            id: 300,
            name: "react"
          },
          {
            id: 400,
            name: "node"
          },
        ]
      },
      {
        id: 2,
        title: "Day 2",
        components: [
          {
            id: 500,
            name: "redux"
          },
          {
            id: 600,
            name: "recoil"
          },
        ]
      }
    ]
      setData(cardsData);
  }, []); 


  const addPlan = (component) => {
    const myObject = selectedPlace.Eg;
    const newObject = {
      ...myObject,
      name: myObject.displayName,
    }

    const newData = [...data];
    if (newData.length > 0) {
        const newComponent = {
            id: Date.now(),
            name: component.displayName,
            details: component
        };
        newData[0].components.push(newComponent);
        setData(newData);
    }
};


  // const addPlan=()=>{
  //     console.log({selectedPlace})
  // }

  const Leftcard =({selectedPlace}) => {
    if(!selectedPlace) {
      return (
        <>
        No place selected
        </>
      )
    }
    const defaultPhoto = "https://via.placeholder.com/400";
    
    let photoURI = selectedPlace.Eg.photos.length > 0 ? selectedPlace.Eg.photos[1].name : defaultPhoto;
    const placeId = selectedPlace.Eg.id;
    if(photoURI !== defaultPhoto) photoURI = `https://places.googleapis.com/v1/${photoURI}/media?maxWidthPx=400&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    console.log(photoURI)
    const editorialSummary = selectedPlace.Eg.editorialSummary || "No editorial summary available.";
    return (
      <div className="card rounded-lg shadow-md overflow-hidden mb-8" key={selectedPlace.Eg.id}> {/* Ensure each place has a unique key */}
        <img src={photoURI} alt={selectedPlace.Eg.displayName} className="card-image" height={200} />
        <div className="p-4">
          <h2 className="text-xl mb-2 text-white">{selectedPlace.Eg.displayName}</h2>
          <p className="text-gray-400 mb-2">Rating: {selectedPlace.Eg.rating}</p>
          <p className="text-gray-500 mb-4">User Ratings: {selectedPlace.Eg.userRatingCount}</p>
          <div className="highlight-bg p-4 rounded-lg shadow-inner">
            <p className="text-white mb-4">{editorialSummary}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.Eg.location.lat},${selectedPlace.Eg.location.lng}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">View on Map</a>
          </div>
          <div className="highlight-bg p-4 rounded-lg shadow-inner">
            <button onClick={addPlan}> Add to plan </button>
          </div>
        </div>
      </div>
    )}


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
        <Leftcard selectedPlace={selectedPlace} />
          
        </div>

        {/* Right Side - Placeholder for Map */}
        <div className="md:col-span-8 map bg-gray-700 rounded-lg shadow-md h-100">
          <MapComponent
            places={ListPlaces}
            setSelectedPlace={setSelectedPlace}
          />
        </div>
      </div>
    <DragDrop CardsData={data}/>
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
      {/* <App  */}
        {/* items={items} */}
        {/* setItems={setItems} */}
        {/* days={3}  */}
      {/* /> */}

    </div>
  );
};

export default Map;
