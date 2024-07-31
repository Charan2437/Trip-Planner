  "use client"

<<<<<<< HEAD
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
=======
  import React, { useEffect,useState } from 'react';
  import styles from './map.module.css';
  import 'tailwindcss/tailwind.css';
  import MapComponent from './map';
  import GoogleMapReact from "google-map-react";
  // import App from '@/app/(dnd)/dnd/page';
  import { lerp } from 'three/src/math/MathUtils.js';
  import { root } from 'postcss';
  import { useItemsStore } from '@/store/placeitems';
  import { useRouter,useSearchParams } from 'next/navigation';
  import DragDrop from '@/app/(dnd)/dnd/page';
  import axios from 'axios';
  import { Herr_Von_Muellerhoff } from 'next/font/google';
  import getHotels from '@/api/getHotels';
  import { db } from '@/connection';
  import { getUserInfo } from '@/myapi/getUserInfo';
  import { doc, getDoc } from 'firebase/firestore';
  import {arrayUnion, query, where, getDocs,updateDoc } from "firebase/firestore";
  import { collection } from "firebase/firestore";
  import { FaMapMarkerAlt } from 'react-icons/fa';
  import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'

  const Map = () => {
    const router = useRouter();
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [data, setData] = useState([]);
    const [dirId,setDirId]=useState(0);
    const [counter, setCounter] = useState(1);
    const [hotels,setHotels]=useState([]);
    const [selectedTab, setSelectedTab] = useState('about');
    const [tripData , setTripData] = useState();
    const [formData,setFormData] = useState();
    const searchParams = useSearchParams();
    const [travelData, setTravelData] = useState(null)
    const [isFormReady, setIsFormReady] = useState(false);

    useEffect(() => {
        const dataParam = searchParams.get('data');
            setFormData(JSON.parse(dataParam));
            
            // const calculateDaysInclusive = (startDate, endDate) => {
            //   const start = new Date(startDate);
            //   const end = new Date(endDate);
            //   const timeDifference = end.getTime() - start.getTime();
            //   return Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1;
            // };
        
            // if (formData) {
            //   const startDate = formData.startDate; // Replace with your actual start date key
            //   const endDate = formData.endDate; // Replace with your actual end date key
            //   if (startDate && endDate) {
            //     const numberOfDaysInclusive = calculateDaysInclusive(startDate, endDate);
            //     setFormData(prevFormData => ({
            //       ...prevFormData,
            //       days: numberOfDaysInclusive,
            //     }));
            //     console.log(`Number of days inclusive: ${numberOfDaysInclusive}`);
            //   }
            // }

    }, [searchParams]);
    

>>>>>>> a4f5d8b00fb1a2c377db29a01c7090f0381e15f5

    useEffect(() => {
      // const cardsData = [
      //   {
      //     id: 0,
      //     title: "All_Places",
      //     hotel : "No hotel",
      //     components: [
      //       // {
      //         //   id: 100,
      //         //   name: "material ui"
      //         // },
      //         // {
      //           //   id: 200,
      //           //   name: "bootstrap"
      //           // },
      //         ]
      //       },
      //       {
      //         id: 1,
      //         title: "Day 1",
      //         hotel : "No hotel Selected",
      //         components: [
      //           // {
      //             //   id: 300,
      //             //   name: "react"
      //             // },
      //             // {
      //               //   id: 400,
      //               //   name: "node"
      //               // },
      //             ]
      //           },
      //           {
      //             id: 2,
      //             title: "Day 2",
      //             hotel : "No hotel Selected",
      //     components: [

<<<<<<< HEAD
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
=======
      //     ]
      //   }
      // ]
      const generateCardsData = (days) => {
        const cards = [
          {
            id: 0,
            title: "All_Places",
            hotel: "No hotel",
            components: [],
          },
        ];
        for (let i = 1; i <= days; i++) {
          cards.push({
            id: i,
            title: `Day ${i}`,
            hotel: `Hotel ${i}`,
            components: [],
          });
        }
        return cards;
      };
      let days= formData?.days ?? 1;
      const newCardsData = generateCardsData(days);
      setData(newCardsData);
      setIsFormReady(true);
    }, [formData]); 

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
    
    
      async function fetchData() {
        const maxAttempts = 1;
        let attempts = 0;
    
          try {
            const response = await axios.post('http://127.0.0.1:5000/generate-itinerary', {
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
>>>>>>> a4f5d8b00fb1a2c377db29a01c7090f0381e15f5
    }
    function getNextValue() {
    let ans = counter;
      setCounter((counter % 2) + 1);

      return ans;
    }

    const SaveTrip = async () => {
      try {
        const dataa = await getUserInfo();
    
        const { uid } = dataa;
    
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          const docRef = doc(db, 'users', querySnapshot.docs[0].id);
    
          let obj = {
            formData: formData || "default value",
            data
          };
          console.log(obj)
    
          if (docData && Array.isArray(docData.trips)) {
            await updateDoc(docRef, {
              trips: arrayUnion(obj)
            });
            console.log("trip is addes")
          } else {
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



      const About = () => (
        <div className="space-y-4">
          <div className="bg-white bg-opacity-20 p-4  rounded-lg shadow-md border border-white text-black space-y-4">
          <Leftcard selectedPlace={selectedPlace} />
          </div>
          {/* <div className="bg-white bg-opacity-20 p-4 h-20 rounded-lg shadow-md border border-white flex items-center text-black space-y-4">
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
          </div> */}
        </div>
      );
    
      // const TravelOptions = () => (
      //   <div className="p-4 bg-white bg-opacity-20 h-48 rounded-lg shadow-md border border-white text-black space-y-4">
      //     <button onClick={genrateOptions}>Generate Travel Options</button>
      //     <h2 className="text-xl font-semibold mb-2">Travel Options</h2>
      //     {travelData && <Markdown>{travelData}</Markdown>}
      //   </div>
      // );
      const TravelOptions = () => (
        <div className="flex justify-center items-center min-h-screen">
          <div className="p-4 bg-white bg-opacity-20 h-auto w-full max-w-md rounded-lg shadow-md border border-white text-black space-y-4">
            <button onClick={genrateOptions}>Generate Travel Options</button>
            <h2 className="text-xl font-semibold mb-2">Travel Options</h2>
            {travelData && <Markdown>{travelData}</Markdown>}
          </div>
        </div>
      );


    
    const Itinerary = () => {
        return (
            <div className={styles.itineraryContainer}>
                <Accordion>
                    {data.slice(1).map((item) => (
                        <AccordionItem key={item.id}>
                            <AccordionItemHeading>
                                <AccordionItemButton className="p-4 mb-2 bg-gray-100">
                                    {item.title}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel className="p-4 bg-gray-50">
                                <p>{item.description}</p>
                                <div>
                                    {item.components.map((component) => (
                                        <div key={component.id} className={styles.itineraryItemComponent}>
                                            <h3 className="text-lg font-semibold">{component.displayName}</h3>
                                            <p>{component.description}</p>
                                            <p>Rating: {component.rating} ({component.userRatingCount} reviews)</p>
                                        </div>
                                    ))}
                                </div>
                                <h1>
                                  show Directions
                                </h1>

                            </AccordionItemPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        );
    };
      const handleDownloadPdf = () => {
        console.log({data})
        // Ensure data is defined and is an object
        if (data) {
          router.push(`/pdf_download?data=${encodeURIComponent(JSON.stringify(data))}`);

        } else {
          console.error('Data is not defined');
        }
      };
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

      const genrateOptions= async( e )=>{
          e.preventDefault();
          let source = formData.source.address;
          let destination = formData.destination.address;
          try {
            const response = await fetch('http://localhost:5000/generate-travel-options', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ source, destination }),
            });
      
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
      
            const dataa = await response.json();
            console.log({dataa})
            setTravelData(dataa.resultbroo);
          } catch (error) {
            console.log(error)
          }
      };

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
  <>
<div className="flex h-screen bg-cover bg-fixed text-black">
  <div className="w-2/5 h-full overflow-y-auto p-4">
    <div className="sticky top-0 bg-white bg-opacity-10 p-4 rounded-lg shadow-lg">
      {/* <img src="/path-to-your-image.jpg" alt="Header" className="w-full h-64 object-cover rounded-lg mb-4" /> */}
      <div className="flex justify-around mb-4">
        <button onClick={() => setSelectedTab('about')} className={`p-4  w-1/3 space-y-4 ${selectedTab === 'about' ? 'bg-gray-300' : 'bg-white bg-opacity-10'} transition`}>About</button>
        <button onClick={() => setSelectedTab('itinerary')} className={`p-4  w-1/3 space-y-4 ${selectedTab === 'itinerary' ? 'bg-gray-300' : 'bg-white bg-opacity-10'} transition`}>Itinerary</button>
        <button onClick={() => setSelectedTab('travelOptions')} className={`p-4  w-1/3 space-y-4 ${selectedTab === 'travelOptions' ? 'bg-gray-300' : 'bg-white bg-opacity-10'} transition`}>Travel Options</button>
      </div>
      {renderContent()}
    </div>
  </div>
  <div className="w-3/5 h-full p-4">
    {/* <div className="md:col-span-8 map bg-gray-700 rounded-lg shadow-md h-100"> */}
    <MapComponent
      ListPlaces={data}
      setSelectedPlace={setSelectedPlace}
      dirId={dirId}
      hotels={hotels}
      setHotels={setHotels}
      setSelectedHotel={setSelectedHotel}
      formData={formData}
    />
  </div>
  {/* </div> */}
  <div className="w-2/5 h-full p-4 overflow-y-auto">
  <DragDrop CardsData={data} setCardsData={setData} setDirId={setDirId} />
</div>
</div>


    <button onClick={AiAutomate} >Ai Automate</button>
    <button onClick={SaveTrip}>Save Trip</button>
    <button onClick={handleDownloadPdf}>Download Pdf</button>

    </>
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


<<<<<<< HEAD
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


<div className="flex h-screen bg-cover bg-fixed text-black"  >
      <div className="w-2/5 h-full overflow-y-auto p-4">
        <div className="sticky top-0 bg-white bg-opacity-10 p-4 rounded-lg shadow-lg">
          {/* <img src="/path-to-your-image.jpg" alt="Header" className="w-full h-64 object-cover rounded-lg mb-4" /> */}
          <div className="flex justify-around mb-4">
            <button onClick={() => setSelectedTab('about')} className={`p-4 rounded-full w-1/3 space-y-4 ${selectedTab === 'about' ? 'bg-gray-300' : 'bg-white bg-opacity-10'} transition `}>About</button>
            <button onClick={() => setSelectedTab('itinerary')} className={`p-4 rounded-full w-1/3 space-y-4 ${selectedTab === 'itinerary' ? 'bg-gray-300' : 'bg-white bg-opacity-10'} transition `}>Itinerary</button>
            <button onClick={() => setSelectedTab('travelOptions')} className={`p-4 rounded-full w-1/3 space-y-4 ${selectedTab === 'travelOptions' ? 'bg-gray-300' : 'bg-white bg-opacity-10'} transition `}>Travel Options</button>
          </div>
          {renderContent()}
        </div>
      </div>
      <div className="w-3/6 h-full p-4">
     <div className="md:col-span-8 map bg-gray-700 rounded-lg shadow-md h-100">
       <MapComponent
         ListPlaces={data}
         setSelectedPlace={setSelectedPlace}
         dirId={dirId}
       />
         </div>
      </div>  
       <DragDrop CardsData={data} setCardsData = {setData} setDirId={setDirId}/>
    </div>







  );
};

export default Map;
=======
  export default Map;
>>>>>>> a4f5d8b00fb1a2c377db29a01c7090f0381e15f5
