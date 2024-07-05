import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import mapStyles from "./styles";
import getPlaces from '../../../api/getPlaces';
import { useState } from 'react';
import Script from 'next/script';

const MapComponent = () => {
    const [mapKey, setMapKey] = useState(0); // Step 1: Initialize the key state

    const [Place , setPlace] = useState("restaurants");
    const options = ['hotels', 'restaurants', 'attractions'];
    const [bounds, setBounds] = useState({bl: {lat: 10.99835602, lng: 77.01502627}, tr: {lat: 10.99835602, lng: 77.01502627}});
    const [places, setPlaces] = useState([]);
    const [coordinates, setcoordinates] = useState({ lat: 10.99835602, lng: 77.01502627 });

    const Marker = ({ lat, lng, place }) => {
        return (
            <div style={{
                color: 'white', 
                background: 'red',
                padding: '5px',
                display: 'inline-flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%', 
                transform: 'translate(-50%, -50%)',
                width: 95, 
                fontSize: '12px', 
            }}>
                <span>hii everyone</span> 
            </div>
        );
    };

    useEffect(() => {
        console.log('Map Component Mounted');
    }
    , []);
    
    const refreshMap = () => {
        setMapKey(prevKey => prevKey + 1); // Step 2: Update the key to refresh the map
    };

    
        const handlePlacesApi = async () => {
            try {
                const response = await getPlaces({ bounds, Place });
                setPlaces(response);
                refreshMap(); // Call this function wherever you need to refresh the map

                console.log({places})
            } catch (error) {
                console.error("Error fetching places:", error);
            }
        };
    const handleOnChangeMap = (e) => {
        setcoordinates({ lat: e.center.lat, lng: e.center.lng });
        setBounds({ tr: e.marginBounds.ne, bl: e.marginBounds.sw });
      };

    return ( 
        <>
        <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
            onLoad={() => {
                console.log('script loaded');
            }}
        />
            <div style={{ height: '90vh', width: '100%' }}>
                <GoogleMapReact
                 key={mapKey}
                    bootstrapURLKeys={{ 
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, 
                    libraries: ['geometry'] 
                    }}
                    defaultCenter={{lat: 10.99835602,
                        lng: 77.01502627}}
                    defaultZoom={14}
                    zoom={14} 
                    margin={[50, 50, 50 ,50 ]}
                    options={{ styles : mapStyles,}}
                    yesIWantToUseGoogleMapApiInternals
                    onChange={handleOnChangeMap}
                >

        {places?.map((place , i) => {
              return (
                <Marker 
                  lat={parseFloat(place.location.lat)} 
                  lng={parseFloat(place.location.lng)} 
                  place={place}
                  key={i}
                />
              );
            })}

            </GoogleMapReact>
            </div>
            <button onClick={handlePlacesApi}>Load places</button>
        </>
     );
}
 
export default MapComponent;




// import React, { useEffect, useState } from 'react';
// import GoogleMapReact from 'google-map-react';
// import mapStyles from "./styles";
// import getPlaces from '../../../api/getPlaces';

// const MapComponent = () => {
//     const [Place, setPlace] = useState("restaurants");
//     const [bounds, setBounds] = useState(null);
//     const [places, setPlaces] = useState([]);
//     const [coordinates, setCoordinates] = useState({ lat: 10.99835602, lng: 77.01502627 });

//     useEffect(() => {
//         console.log('Map Component Mounted');
//     }, []);

//     useEffect(() => {
//         if (bounds) {
//             fetchPlaces();
//         }
//     }, [bounds, Place]);

//     const fetchPlaces = async () => {
//         try {
//             const response = await getPlaces({ bounds, Place });
//             setPlaces(response.data);
//         } catch (error) {
//             console.error("Error fetching places:", error);
//         }
//     };

//     const handleOnChangeMap = (e) => {
//         setCoordinates({ lat: e.center.lat, lng: e.center.lng });
//         setBounds({ tr: e.marginBounds.ne, bl: e.marginBounds.sw });
//     };

//     const Marker = ({ lat, lng, place }) => {
//         return (
//             <div style={{
//                 color: 'white', 
//                 background: 'red',
//                 padding: '10px 5px',
//                 display: 'inline-flex',
//                 textAlign: 'center',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: '100%',
//                 transform: 'translate(-50%, -50%)'
//             }}>
//                 <h1>{place.name}</h1> {/* Displaying the place name */}
//             </div>
//         );
//     };

//     return ( 
//         <>
//             <div style={{ height: '90vh', width: '100%' }}>
//                 <GoogleMapReact
//                     bootstrapURLKeys={{ 
//                         key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, 
//                         libraries: ['places', 'geometry'] 
//                     }}
//                     defaultCenter={coordinates}
//                     defaultZoom={14}
//                     zoom={14} 
//                     margin={[50, 50, 50, 50]}
//                     options={{ styles: mapStyles }}
//                     onChange={handleOnChangeMap}
//                 >
//                     {places?.map((place, i) => (
//                         <Marker 
//                             lat={parseFloat(place.latitude)} 
//                             lng={parseFloat(place.longitude)} 
//                             place={place}
//                             key={i}
//                         />
//                     ))}
//                 </GoogleMapReact>
//             </div>
//             <button onClick={fetchPlaces}>Load places</button>
//         </>
//     );
// }
 
// export default MapComponent;














// import { useState, useEffect, useRef } from 'react';
// import Script from 'next/script';

// const MapComponent = () => {
//     const mapRef = useRef(null);
//     const [isScriptLoaded, setIsScriptLoaded] = useState(false); // Step 1

//     useEffect(() => {
//         if (isScriptLoaded) { // Step 3
//             const initMap = () => {
//                 const map = new google.maps.Map(mapRef.current, {
//                     zoom: 8,
//                     center: { lat: -34.397, lng: 150.644 },
//                 });
//                 // Additional map setup...
//             };

//             initMap();
//         }
//     }, [isScriptLoaded]); // Call initMap only after the script has loaded

//     return (
//         <>
            
//             <div ref={mapRef} style={{ height: '90vh', width: '100%' }}></div>
//         </>
//     );
// };

// export default MapComponent;