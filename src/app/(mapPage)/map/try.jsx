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
import { db } from '@/connection';
import { getUserInfo } from '@/myapi/getUserInfo';
import { doc, getDoc } from 'firebase/firestore';
import {arrayUnion, query, where, getDocs,updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { FaMapMarkerAlt } from 'react-icons/fa';

const Map = () => {

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [data, setData] = useState([]);
  const [dirId,setDirId]=useState(0);
  const [selectedTab, setSelectedTab] = useState('about');

  useEffect(() => {
    const cardsData = [
      {
        id: 0,
        title: "All_Places",
        components: [
        ]
      },
      {
        id: 1,
        title: "Day 1",
        components: [
        ]
      },
      {
        id: 2,
        title: "Day 2",
        components: [
        ]
      }
    ]
      setData(cardsData);
  }, []); 


  const addPlan = () => {
    const newComponent = selectedPlace.Eg;

        const newObject = {
      ...newComponent,
      name: newComponent.displayName,
    }
    setData(prevData =>
      prevData.map(card => 
        card.id === 0
          ? { ...card, components: [...card.components, newObject] }
          : card
      )
    );
  };
  // const SaveTrip= async () => {
  //   getUserInfo().then((data) => {
  //     console.log(data);
  //   });
  //   // const q = query(collection(db, "users"), where("uid", "==", uid));
  //   // const querySnapshot = await getDocs(q);
  //   // const docData = querySnapshot.docs[0].data();
  //   // const docRef = doc(db, 'users', querySnapshot.docs[0].id);
  //   // console.log({data});
  //   // let obj = {
  //   //   formData: formData || "default value",
  //   //   columns
  //   // }
  //   // if (docData && Array.isArray(docData.trips)) {
  //   //   // If trips is an array, update it with arrayUnion
  //   //   await updateDoc(docRef, {
  //   //     trips: arrayUnion(obj)
  //   //   });
  //   // } else {
  //   //   // If trips doesn't exist or isn't an array, initialize it as an empty array
  //   //   await updateDoc(docRef, {
  //   //     trips: [obj]
  //   //   });
  //   // }
  // }
  let formData = {
    name : "aks",
    destination : "vijayawada"
  };
  const SaveTrip = async () => {
    try {
      // Await the result of getUserInfo to ensure data is retrieved before proceeding
      const dataa = await getUserInfo();
  
      // Extract uid from the retrieved data  
      const { uid } = dataa;
  
      // Query Firestore to get the user's document
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        const docRef = doc(db, 'users', querySnapshot.docs[0].id);
  
        // Prepare the object to be added to the trips array
        let obj = {
          formData: formData || "default value",
          data
        };
        console.log(obj)
  
        // Update the user's document with the new trip information
        if (docData && Array.isArray(docData.trips)) {
          // If trips is an array, update it with arrayUnion
          await updateDoc(docRef, {
            trips: arrayUnion(obj)
          });
          console.log("trip is addes")
        } else {
          // If trips doesn't exist or isn't an array, initialize it as an empty array
          await updateDoc(docRef, {
            trips: [obj]
          });
          console.log("trip is addes")
        }
      } else {
        console.error("No user document found with the provided uid.");
      }
    } catch (error) {
      console.error("Error saving trip:", error);
    }
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
          <h2 className="text-xl mb-2 text-black">{selectedPlace.Eg.displayName}</h2>
          <p className="text-gray-400 mb-2">Rating: {selectedPlace.Eg.rating}</p>
          <p className="text-gray-500 mb-4">User Ratings: {selectedPlace.Eg.userRatingCount}</p>
          <div className="highlight-bg p-4 rounded-lg shadow-inner">
            <p className="text-black mb-4">{editorialSummary}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.Eg.location.lat},${selectedPlace.Eg.location.lng}`} className="text-blue-500" target="_blank" rel="noopener noreferrer">View on Map</a>
          </div>
          <div className="highlight-bg p-4 rounded-lg shadow-inner">
            <button onClick={addPlan}> Add to plan </button>
          </div>
        </div>
      </div>
    )}



    const About = () => (
      <div className="space-y-4">
        <div className="bg-white bg-opacity-20 p-4  rounded-lg shadow-md border border-white text-black space-y-4">
        <Leftcard selectedPlace={selectedPlace} />
        </div>
        <div className="bg-white bg-opacity-20 p-4 h-20 rounded-lg shadow-md border border-white flex items-center text-black space-y-4">
          <FaMapMarkerAlt className="text-red-500 mr-2" />
          <h2 className="text-xl font-semibold mb-2">Hotels</h2>
        </div>
        <div className="bg-white bg-opacity-20 p-4 h-20 rounded-lg shadow-md border border-white flex items-center text-black space-y-4">
          <FaMapMarkerAlt className="text-green-500 mr-2" />
          <h2 className="text-xl font-semibold mb-2">Holy Places</h2>
        </div>
        <div className="bg-white bg-opacity-20 p-4 h-20 rounded-lg shadow-md border border-white flex items-center text-black space-y-4" >
          <FaMapMarkerAlt className="text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold mb-2">Parks and Entertainments</h2>
        </div>
      </div>
    );
  
    const Itinerary = () => (
      <div className="space-y-4">

      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md border border-white relative text-black space-y-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">DAY {index + 1}</h2>
          
          <div className="absolute bottom-4 right-4 space-x-4">
            <a href="#" className="text-blue-500">Show directions</a>
            <a href="#" className="text-blue-500">Show more</a>
          </div>
        </div>
      ))}
      </div>
    );
  
    const TravelOptions = () => (
      <div className="p-4 bg-white bg-opacity-20 h-48 rounded-lg shadow-md border border-white text-black space-y-4">
        <h2 className="text-xl font-semibold mb-2">Travel Options</h2>
        <p>Travel options content goes here.</p>
      </div>
    );
  
    const renderContent = () => {
      switch (selectedTab) {
        case 'about':
          return <About />;
        case 'itinerary':
          return <Itinerary />;
        case 'travelOptions':
          return <TravelOptions />;
        default:
          return <About />;
      }
    };



  return (
    // <div className="p-8 bg-black text-black">
    //   {/* Header */}


    //   {/* Main Content */}
    //   <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
    //     {/* Left Side - Card Component */}
    //      <div className="md:col-span-4">
    //     <Leftcard selectedPlace={selectedPlace} />
          
    //     </div>

    //     {/* Right Side - Placeholder for Map */}
    //     <div className="md:col-span-8 map bg-gray-700 rounded-lg shadow-md h-100">
    //       <MapComponent
    //         ListPlaces={data}
    //         setSelectedPlace={setSelectedPlace}
    //         dirId={dirId}
    //       />
    //     </div>
    //   </div>
    // <DragDrop CardsData={data} setCardsData = {setData} setDirId={setDirId}/>
    //   {/* Bottom - Placeholder for Drag and Drop UI */}
    //   <div className="mt-8">
    //     <h2 className="text-xl mb-4 text-black">Bucket List</h2>
    //     <div className="grid grid-cols-3 gap-4">
    //       <div className={`${styles.bucketListItem} bg-gray-800 rounded-lg shadow-md p-4`}>
    //         Item 1
    //       </div>
    //       <div className={`${styles.bucketListItem} bg-gray-800 rounded-lg shadow-md p-4`}>
    //         Item 2
    //       </div>
    //       <div className={`${styles.bucketListItem} bg-gray-800 rounded-lg shadow-md p-4`}>
    //         Item 3
    //       </div>
    //     </div>
    //   </div>
    //   <div></div>
    //   {/* <App  */}
    //     {/* items={items} */}
    //     {/* setItems={setItems} */}
    //     {/* days={3}  */}
    //   {/* /> */}
    // <button onClick={SaveTrip}>Save Trip</button>
    // </div>


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
