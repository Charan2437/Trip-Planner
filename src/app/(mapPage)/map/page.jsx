"use client"

import React, { useEffect,useState } from 'react';
import styles from './map.module.css';
import 'tailwindcss/tailwind.css';
import MapComponent from './map';
import GoogleMapReact from "google-map-react";
// import App from '@/app/(dnd)/dnd/page';
import { lerp } from 'three/src/math/MathUtils.js';
import { root } from 'postcss';
import { useItemsStore } from '@/store/placeitems';
import DragDrop from '@/app/(dnd)/dnd/page';
import axios from 'axios';
import { Herr_Von_Muellerhoff } from 'next/font/google';
import getHotels from '@/api/getHotels';
import { get } from 'http';

const Map = () => {
  
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [data, setData] = useState([]);
  const [dirId,setDirId]=useState(0);
  const [counter, setCounter] = useState(1);
  const [hotels,setHotels]=useState([]);
  useEffect(() => {
    const cardsData = [
      {
        id: 0,
        title: "All_Places",
        hotel : "No hotel",
        components: [
          // {
            //   id: 100,
            //   name: "material ui"
            // },
            // {
              //   id: 200,
              //   name: "bootstrap"
              // },
            ]
          },
          {
            id: 1,
            title: "Day 1",
            hotel : "No hotel Selected",
            components: [
              // {
                //   id: 300,
                //   name: "react"
                // },
                // {
                  //   id: 400,
                  //   name: "node"
                  // },
                ]
              },
              {
                id: 2,
                title: "Day 2",
                hotel : "No hotel Selected",
        components: [

        ]
      }
    ]
      setData(cardsData);
  }, []); 

  const AiAutomate = () => {
    const datatosent = data;
  
    const extractRequiredKeys = (data) => {
      return data.map(place => ({
        id: place.id,
        title: place.title,
        hotel: typeof place.hotel === 'object' ? {
          id: place.hotel.id,
          displayName: place.hotel.displayName,
          location: place.hotel.location
        } : place.hotel, 
        components: place.components.map(component => ({
          id: component.id,
          displayName: component.displayName,
          location: component.location
        }))
      }));
    };
    const createPlaceMap = (data) => {
      const placeMap = new Map();
      data.forEach(place => {
        placeMap.set(place.id, place);
      });
      return placeMap;
    };
  
    const mergeData = (originalMap, newData) => {
      newData.forEach(newPlace => {
        if (originalMap.has(newPlace.id)) {
          const originalPlace = originalMap.get(newPlace.id);
          newPlace.components.forEach(newComponent => {
            const existingComponentIndex = originalPlace.components.findIndex(comp => comp.id === newComponent.id);
            if (existingComponentIndex !== -1) {
              originalPlace.components[existingComponentIndex] = {
                ...originalPlace.components[existingComponentIndex],
                ...newComponent
              };
            } else {
              originalPlace.components.push(newComponent);
            }
          });
        } else {
          originalMap.set(newPlace.id, newPlace);
        }
      });
      
      return Array.from(originalMap.values());
    };
  
  
    const filteredData = extractRequiredKeys(datatosent);
    let newData = [];
  
    console.log(filteredData);
  
    async function fetchData() {
      const maxAttempts = 1;
      let attempts = 0;
  
        try {
          const response = await axios.post('http://192.168.0.13:5000/generate-itinerary', {
            message: filteredData
          });
          const responseData = response.data;
          console.log({responseData});

          if( "final_array_of_items" in responseData){
            newData = responseData.final_array_of_items;
            setData(newData);
            return;
          }

          try {
            if (Array.isArray(responseData)) {
              console.log("Parsed as JSON array:", responseData);
              setData(responseData);
            } else {
              throw new Error("Data is not an array");
            }
          } catch (e) {
          try {
            // Wrap the string with square brackets
            let wrappedResponseDataString;
            if(responseData[0]!='[') wrappedResponseDataString= `[${responseData}]`;
            else wrappedResponseDataString=responseData;
          
            // Parse the resulting JSON string
            const parsedArray = JSON.parse(wrappedResponseDataString);
          
            console.log({parsedArray});
            setData(parsedArray);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
          
        }
        } catch (error) {
          console.error(`Attempt ${attempts}: ${error.message}`);
        }
      }
  
    // }
  
    fetchData();
  }
  function getNextValue() {
  let ans = counter;
    setCounter((counter % 2) + 1);

    return ans;
  }


  // const addHotel = () => {
  //   const newComponent = selectedHotel.Eg;
  //   const newObject = {
  //     ...newComponent,
  //     name: newComponent.displayName,
  //   }
  //   console.log({newComponent})
  //   setData(prevData =>
  //     prevData.map(card =>
  //       card.id === getNextValue()
  //         ? { ...card, hotel: newObject }
  //         : card
  //     )
  //   );
  // }


  const addPlan = () => {
    const newComponent = selectedPlace.Eg;
        const newObject = {
      ...newComponent,
      name: newComponent.displayName,
    }
    if(newComponent.types.includes("lodging")){
      console.log("comming")
      let x= getNextValue();
      setData(prevData =>
        prevData.map(card => (card.id == x ? { ...card, hotel: newObject } : card))
      );
      return;
    }
    setData(prevData =>
      prevData.map(card => 
        card.id === 0
          ? { ...card, components: [...card.components, newObject] }
          : card
      )
    );
  };

  const Leftcard =({selectedPlace}) => {
    if(!selectedPlace) {
      return (
        <>
        No place selected
        </>
      )
    }
    const defaultPhoto = "https://via.placeholder.com/400";
    
    let photoURI = selectedPlace.Eg.photos.length > 0 ? selectedPlace.Eg.photos[1]?.name : defaultPhoto;
    const placeId = selectedPlace.Eg.id;
    if(photoURI !== defaultPhoto) photoURI = `https://places.googleapis.com/v1/${photoURI}/media?maxWidthPx=400&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
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
            ListPlaces={data}
            setSelectedPlace={setSelectedPlace}
            dirId={dirId}
            hotels={hotels}
            setHotels={setHotels}
            setSelectedHotel={setSelectedHotel}
          />
        </div>
      </div>
    <DragDrop CardsData={data} setCardsData = {setData} setDirId={setDirId}/>
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
      <button onClick={AiAutomate} >Ai Automate</button>
    </div>
  );
};

export default Map;
