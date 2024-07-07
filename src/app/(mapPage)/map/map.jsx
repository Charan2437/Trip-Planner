// "use client";

// import React, { useEffect } from 'react';
// import GoogleMapReact from 'google-map-react';
// import mapStyles from "./styles";
// import getPlaces from '../../../api/getPlaces';
// import { useState } from 'react';
// import Script from 'next/script';
// import Pointer from '../../../../public/placeholder.png'
// import Image from 'next/image';

// const MapComponent = () => {
//     const [mapKey, setMapKey] = useState(0); // Step 1: Initialize the key state
//     const [Place , setPlace] = useState("restaurants");
//     const [zoom, setZoom] = useState(11);

//     const options = ['hotels', 'restaurants', 'attractions'];
//     const [bounds, setBounds] = useState({bl: {lat: 10.99835602, lng: 77.01502627}, tr: {lat: 10.99835602, lng: 77.01502627}});
//     const [places, setPlaces] = useState([]);
//     const [coordinates, setCoordinates] = useState({ lat: 10.99835602, lng: 77.01502627 });

//     const Marker = ({ lat, lng, place }) => {
//         console.log("cmoming")
//         return (
//             <div
//                 style={{
//                     transform: 'translate(-50%, -50%)',
//                     background: 'white',
//                     width: '100px',
//                 }}
//             >
//             <Image
//                 src={Pointer}
//                 alt="Pointer"
//                 width={30}
//                 height={30}
//             />
//             </div>
//         );
//     };

//     useEffect(() => {
//         console.log('Map Component Mounted');
//     }
//     , []);
    
//     const refreshMap = () => {
//         setMapKey(prevKey => prevKey + 1); // Step 2: Update the key to refresh the map
//     };

    
//         const handlePlacesApi = async () => {
//             try {
//                 const response = await getPlaces({ bounds, Place });
//                 setPlaces(response);
//                 console.log(response[0].Eg.location.lat);
//                 refreshMap(); // Ca ll this function wherever you need to refresh the map

//             } catch (error) {
//                 console.error("Error fetching places:", error);
//             }
//         };
//     const handleOnChangeMap = (e) => {
//         setCoordinates({ lat: e.center.lat, lng: e.center.lng });
//         setBounds({ tr: e.marginBounds.ne, bl: e.marginBounds.sw });
//         // refreshMap(); 
//       };
//     return ( 
//         <>
//         <Script
//             src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
//             onLoad={() => {
//                 console.log('script loaded');
//             }}
//         />
//             <div style={{ height: '90vh', width: '100%' }}>
//                 <GoogleMapReact
//                      key={mapKey}
//                     bootstrapURLKeys={{ 
//                     key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, 
//                     libraries: ['geometry'] 
//                     }}
//                     center={coordinates} // Step 3: Use the center state here
//                     defaultCenter={{lat: 10.99835602,
//                     lng: 77.01502627}}
//                     defaultZoom={14}
//                     zoom={14} 
//                     margin={[50, 50, 50 ,50 ]}
//                     // options={{ styles : mapStyles,}}
//                     yesIWantToUseGoogleMapApiInternals
//                     onChange={handleOnChangeMap}
//                 >

//         {/* {places?.map((place , i) => {
            
//               return (
//                 <Marker 
//                   lat={parseFloat(place.Eg.location.lat)} 
//                   lng={parseFloat(place.Eg.location.lng)} 
//                   place={place}
//                   key={i}
//                 // anchor={{ x: 0.5, y: 0.40 }}
//                 />
//               );
//             })} */}
//             <Marker
//                 lat={parseFloat(10.99835602)}
//                 lng={parseFloat(77.01502627)}
//             />

//             </GoogleMapReact>
//             </div>
//             <button onClick={handlePlacesApi}>Load places</button>
//         </>
//      );
// }
 
// export default MapComponent;




// // import React, { useEffect, useState } from 'react';
// // import GoogleMapReact from 'google-map-react';
// // import mapStyles from "./styles";
// // import getPlaces from '../../../api/getPlaces';

// // const MapComponent = () => {
// //     const [Place, setPlace] = useState("restaurants");
// //     const [bounds, setBounds] = useState(null);
// //     const [places, setPlaces] = useState([]);
// //     const [coordinates, setCoordinates] = useState({ lat: 10.99835602, lng: 77.01502627 });

// //     useEffect(() => {
// //         console.log('Map Component Mounted');
// //     }, []);

// //     useEffect(() => {
// //         if (bounds) {
// //             fetchPlaces();
// //         }
// //     }, [bounds, Place]);

// //     const fetchPlaces = async () => {
// //         try {
// //             const response = await getPlaces({ bounds, Place });
// //             setPlaces(response.data);
// //         } catch (error) {
// //             console.error("Error fetching places:", error);
// //         }
// //     };

// //     const handleOnChangeMap = (e) => {
// //         setCoordinates({ lat: e.center.lat, lng: e.center.lng });
// //         setBounds({ tr: e.marginBounds.ne, bl: e.marginBounds.sw });
// //     };

// //     const Marker = ({ lat, lng, place }) => {
// //         return (
// //             <div style={{
// //                 color: 'white', 
// //                 background: 'red',
// //                 padding: '10px 5px',
// //                 display: 'inline-flex',
// //                 textAlign: 'center',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 borderRadius: '100%',
// //                 transform: 'translate(-50%, -50%)'
// //             }}>
// //                 <h1>{place.name}</h1> {/* Displaying the place name */}
// //             </div>
// //         );
// //     };

// //     return ( 
// //         <>
// //             <div style={{ height: '90vh', width: '100%' }}>
// //                 <GoogleMapReact
// //                     bootstrapURLKeys={{ 
// //                         key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, 
// //                         libraries: ['places', 'geometry'] 
// //                     }}
// //                     defaultCenter={coordinates}
// //                     defaultZoom={14}
// //                     zoom={14} 
// //                     margin={[50, 50, 50, 50]}
// //                     options={{ styles: mapStyles }}
// //                     onChange={handleOnChangeMap}
// //                 >
// //                     {places?.map((place, i) => (
// //                         <Marker 
// //                             lat={parseFloat(place.latitude)} 
// //                             lng={parseFloat(place.longitude)} 
// //                             place={place}
// //                             key={i}
// //                         />
// //                     ))}
// //                 </GoogleMapReact>
// //             </div>
// //             <button onClick={fetchPlaces}>Load places</button>
// //         </>
// //     );
// // }
 
// // export default MapComponent;















"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import getPlaces from '../../../api/getPlaces';
import mapStyles from "./styles";
import { Polyline } from "@react-google-maps/api";

const libraries = ['places'];
const mapContainerStyle = {
  height: '90vh',
  width: '100%',
};
const center = {
  lat: 16.2202889,
  lng: 80.650589,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const MapComponent = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [places, setPlaces] = useState([]);
  const [mapRef, setMapRef] = useState(null);
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
    // const [directionsService, setDirectionsService] = useState(null);
    // const [mapsApi, setMapsApi] = useState(null);
    // const [directions, setDirections] = useState([]);
    // const [waypoints, setWaypoints] = useState([]);
    const [mapInstance , setMapInstance] = useState(null);  



    // useEffect(() => {
    //     if (mapsApi) {
    //       const service = new mapsApi.DirectionsService();
    //       const renderer = new mapsApi.DirectionsRenderer();
    //       setDirectionsRenderer(renderer);
    //       setDirectionsService(service);
    //     }
    //   }, [mapsApi]);
    
    //   const RenderDirections = (map, maps , ListPlaces) => {
    //     // List Places should be array of { lat : , lng : };
    //     console.log("comming TO render directions")
    //     ListPlaces = ListPlaces.filter(place => {
    //       let lat = parseFloat(place.lat);
    //       let lng = parseFloat(place.lng);
    //       return !isNaN(lat) && !isNaN(lng);
    //     });
        
    //     console.log({ListPlaces})
    //     if(!ListPlaces || ListPlaces.length < 2){
    //       ListPlaces = [{lat: 37.77, lng: -122.447}, { lat: 37.79, lng: -122.41 }, { lat: 37.79, lng: -122.41 }, {lat: 37.768, lng: -122.511 }]
    //     }
    //     directionsRenderer?.setMap(null);
    //     let n = ListPlaces.length;
    //     const waypts = ListPlaces.slice(1, n-1).map(place => {
    //       return {
    //         location: { lat: place.lat, lng: place.lng },
    //         stopover: true,
    //       }
    //     });
    //     directionsRenderer?.setMap(map);
    //     setDirectionsRenderer(directionsRenderer);
    //     directionsService?.route(
    //       {
    //         origin: { lat: ListPlaces[0].lat, lng: ListPlaces[0].lng },
    //         destination: { lat: ListPlaces[n-1].lat, lng: ListPlaces[n-1].lng },
    //         travelMode: maps.TravelMode.DRIVING,    
    //         waypoints: waypts,
    //       },
          
    //       (response, status) => {
    //         if (status === "OK") {
    //           directionsRenderer.setDirections(response);
    //           console.log(response?.routes[0].legs[0].steps[0].instructions    )
    //           const stepInstructions = response?.routes[0].legs.map(leg => leg.steps.map(step => step.instructions));
    //           setDirections(...stepInstructions);
    //         } else {
    //           window.alert("Directions request failed due to " + status);
    //         }
    //       }
    //     );
    //   };


  const onMapLoad = useCallback((map) => {
    setMapRef(map);
  }, []);

  const fetchPlaces = async () => {
    try {
      const bounds = mapRef.getBounds().toJSON();
      console.log({bounds})
      const response = await getPlaces({ bounds, place: "restaurants" });
      setPlaces(response);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {places.map((place, i) => (
          <Marker
            key={i}
            position={{
              lat: parseFloat(place.Eg.location.lat),
              lng: parseFloat(place.Eg.location.lng),
            }}
          />
        ))}
      </GoogleMap>
      <button onClick={fetchPlaces}>Load places</button>
      <div style={{display : "flex" , justifyContent : "space-around"}}>
        <button variant="contained" onClick={()=>RenderDirections(mapInstance, mapsApi, ListPlaces)} sx={{marginBottom : "10px"}}>Test Directions</button>
        <br />
        <button variant="contained" sx={{marginBottom : "10px"}} onClick={()=>DirectionStop() } >Remove Directions</button>
      </div>
    </>
  );
};

export default MapComponent;