
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker,InfoWindow } from '@react-google-maps/api';
import getPlaces from '../../../api/getPlaces';
import mapStyles from "./styles";
import { Polyline } from "@react-google-maps/api";
import getHotels from '@/api/getHotels';


const libraries = ['places'];
const mapContainerStyle = {
  height: '90vh',
  width: '100%',
};
// const center = {
//   lat: 16.2202889,
//   lng: 80.650589,
// };
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const MapComponent = ({setSelectedPlace, ListPlaces,dirId,hotels,setHotels,formData}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [places, setPlaces] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [showHotels , setShowHotels] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapsApi, setMapsApi] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directions , setDirections]= useState(null);
  // const [ListPlaces , setListPlaces] = useState([]);
  const [hoveredPlace, setHoveredPlace] = useState(null);

  const onMapLoad = useCallback((map) => {
    setMapRef(map);
    setMapInstance(map);
    setMapsApi(map);
  }, []);
  useEffect(()=>{
    // console.log(formData)
  },[]);
  const RenderHelper=()=>{

    if(dirId===0) return;
    console.log(ListPlaces)
    let latitudesAndLongitudes = ListPlaces[dirId]?.components.map(({ location }) => ({
      lat: location.lat,
      lng: location.lng
    }));
    let hotelLocation = ListPlaces[dirId]?.hotel?.location;
    if (hotelLocation) {
      latitudesAndLongitudes = [hotelLocation, ...latitudesAndLongitudes];
    }
    console.log(latitudesAndLongitudes)
    RenderDirections(mapInstance, mapsApi, latitudesAndLongitudes)
  }

  useEffect(()=>{
    RenderHelper()
  },[dirId])

  useEffect(() => {
    if (mapsApi) {
      const service = new google.maps.DirectionsService();
      const renderer = new google.maps.DirectionsRenderer();
      setDirectionsRenderer(renderer);
      setDirectionsService(service);
    }
  }, [mapsApi]);

  const RenderDirections = (map, maps , ListPlaces) => {
    // List Places should be array of { lat : , lng : };
    if(mapsApi==null || map == null) return;
    ListPlaces = ListPlaces.filter(place => {
      let lat = parseFloat(place.lat);
      let lng = parseFloat(place.lng);
      return !isNaN(lat) && !isNaN(lng);
    });
    
    console.log({ListPlaces})
    if(!ListPlaces || ListPlaces.length < 2){
      alert("Please select atleast 2 places to get directions");
      // ListPlaces = [{lat: 37.77, lng: -122.447}, { lat: 37.79, lng: -122.41 }, { lat: 37.79, lng: -122.41 }, {lat: 37.768, lng: -122.511 }]
    }
    directionsRenderer?.setMap(null);
    let n = ListPlaces.length;
    const waypts = ListPlaces.slice(1, n-1).map(place => {
      return {
        location: { lat: place.lat, lng: place.lng },
        stopover: true,
      }
    });
    console.log("comming TO render directions")
    directionsRenderer?.setMap(map);
    setDirectionsRenderer(directionsRenderer);
    directionsService?.route(
      {
        origin: { lat: ListPlaces[0].lat, lng: ListPlaces[0].lng },
        destination: { lat: ListPlaces[n-1].lat, lng: ListPlaces[n-1].lng },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypts,
      },
      
      (response, status) => {
        if (status === "OK") {
          console.log("comming He")
          console.log({response})
          directionsRenderer.setDirections(response);
          console.log(response?.routes[0].legs[0].steps[0].instructions    )
          // console.log(response?.routes )
          const stepInstructions = response?.routes[0].legs.map(leg => leg.steps.map(step => step.instructions));
          setDirections(...stepInstructions);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
    console.log({directions})
  };

  const DirectionStop = () => {
    directionsRenderer?.setMap(null);
  }


  const fetchPlaces = async () => {
    try {
      const bounds = mapRef.getBounds().toJSON();
      const response = await getPlaces({ bounds, place: "restaurants" });
      setPlaces(response);
      
    } catch (error) {
      console.error("Error fetching places:", error);
    }

  };
  // useEffect(()=>{

  // },[FormData]);
  
  const fetchHotels = async () => {
    if(hotels.length > 0){
      setShowHotels(!showHotels);
    }

    try {
      const bounds = mapRef.getBounds().toJSON();
      console.log("getHotels called : ")
      const response = await getHotels({ bounds, place: "restaurants" });
      console.log(response)
      let p= !showHotels;
      setShowHotels(p);
      setHotels(response);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";
  const blueIcon = {
    url: 'https://cdn-icons-png.flaticon.com/128/7987/7987463.png',
    scaledSize: new google.maps.Size(40, 40),
  };
  const redIcon = {
    url: 'https://cdn-icons-png.flaticon.com/128/14090/14090313.png',
    scaledSize: new google.maps.Size(40, 40),
  };
  const greenIcon = {
    url: 'https://cdn-icons-png.flaticon.com/128/14090/14090489.png',
    scaledSize: new google.maps.Size(40, 40),
  };
  const yellowIcon = {
    url: 'https://cdn-icons-png.flaticon.com/128/8065/8065913.png',
    scaledSize: new google.maps.Size(40, 40),
  };

  function getColorByTypes(types) {
    // Check if 'park' is one of the types in the array
    console.log({types})
    const hasPark = types.some(type => type === 'park');
  
    if (hasPark) {
      return greenIcon; // Return 'green' if any of the types is 'park'
    } else {
      // If no type is 'park', check for 'holy place' or default to 'red'
      const hasHolyPlace = types.some(type => type === 'place_of_worship');
      return hasHolyPlace ? yellowIcon : redIcon;
    }
  }


  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={{lat : formData.destination.lat, lng : formData.destination.lng}}
        options={options}
        onLoad={onMapLoad}
      >

{showHotels && hotels.map((hotel, i) => (
          <Marker
            key={i}
            icon={blueIcon} // Use blue icon for hotels
            width="10px"
            position={{
              lat: parseFloat(hotel.Eg.location.lat),
              lng: parseFloat(hotel.Eg.location.lng),
            }}
            onMouseOver={() => setHoveredPlace(hotel)} // Set hovered place on hover
            onMouseOut={() => setHoveredPlace(null)} 
              // Clear hovered place on mouse out
            onClick={() => setSelectedPlace(hotel)}    // Set selected place on click
          >
            {(hoveredPlace === hotel ) && (
              <InfoWindow
                position={{
                  lat: parseFloat(hotel.Eg.location.lat),
                  lng: parseFloat(hotel.Eg.location.lng),
                }}
                onCloseClick={() => setSelectedPlace(null)} // Close info window on click
              >
                <div style={{ color: 'black' }}>
                  <h2>{hotel.Eg.displayName}</h2> {/* Display place name */}
                  <p><strong>Status:</strong> {hotel.businessStatus}</p> {/* Business Status */}
                  <p><strong>Rating:</strong> {hotel.rating} ({hotel.userRatingCount} ratings)</p> {/* Rating and User Rating Count */}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}

        {!showHotels && places.map((place, i) => (
          <Marker
            key={i}
            icon={getColorByTypes(place.Eg.types)} // Use red icon for restaurants
            position={{
              lat: parseFloat(place.Eg.location.lat),
              lng: parseFloat(place.Eg.location.lng),
            }}
            onMouseOver={() => setHoveredPlace(place)} // Set hovered place on hover
            onMouseOut={() => setHoveredPlace(null)} 
              // Clear hovered place on mouse out
            onClick={() => setSelectedPlace(place)}    // Set selected place on click
          >
            {(hoveredPlace === place ) && (
              <InfoWindow
                position={{
                  lat: parseFloat(place.Eg.location.lat),
                  lng: parseFloat(place.Eg.location.lng),
                }}
                onCloseClick={() => setSelectedPlace(null)} // Close info window on click
              >
                <div style={{ color: 'black' }}>
                  <h2>{place.Eg.displayName}</h2> {/* Display place name */}
                  <p><strong>Status:</strong> {place.businessStatus}</p> {/* Business Status */}
                  <p><strong>Rating:</strong> {place.rating} ({place.userRatingCount} ratings)</p> {/* Rating and User Rating Count */}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
      <div className="relative">
  {/* Your map component here */}
  <div className="absolute bottom-4 left-4 space-y-2">
    <button onClick={fetchPlaces} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
      Load places
    </button>
    <button onClick={fetchHotels} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
      Hotels Display
    </button>
  </div>
</div>
      {/* <div style={{display : "flex" , justifyContent : "space-around"}}>
        <button variant="contained" onClick={()=>RenderDirections(mapInstance, mapsApi, ListPlaces)} sx={{marginBottom : "10px"}}>Test Directions</button>
        <br />
        <button variant="contained" sx={{marginBottom : "10px"}} onClick={()=>DirectionStop() } >Remove Directions</button>
      </div> */}
    </>
  );
};

export default MapComponent;


// temple icon - <a href="https://www.flaticon.com/free-icons/religion" title="religion icons">Religion icons created by Freepik - Flaticon</a>
// hotel icon -<a href="https://www.flaticon.com/free-icons/empire-state-building" title="empire state building icons">Empire state building icons created by Muhammad Bagus Wicaksono - Flaticon</a>
// hotel - <a href="https://www.flaticon.com/free-icons/maps-and-location" title="maps and location icons">Maps and location icons created by asol_studio - Flaticon</a>

// blue marker <a href="https://www.flaticon.com/free-icons/location-pin" title="location pin icons">Location pin icons created by Talha Dogar - Flaticon</a>
// red marker <a href="https://www.flaticon.com/free-icons/red" title="red icons">Red icons created by hqrloveq - Flaticon</a>
// gold marker <a href="https://www.flaticon.com/free-icons/location-pin" title="location pin icons">Location pin icons created by Senapedia - Flaticon</a>
// green marker <a href="https://www.flaticon.com/free-icons/1" title="1 icons">1 icons created by hqrloveq - Flaticon</a>