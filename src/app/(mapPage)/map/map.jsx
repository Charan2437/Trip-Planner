
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

const MapComponent = ({setSelectedPlace}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [places, setPlaces] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapsApi, setMapsApi] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directions , setDirections]= useState(null);
  const [ListPlaces , setListPlaces] = useState([]);
  const onMapLoad = useCallback((map) => {
    setMapRef(map);
    setMapInstance(map);
    setMapsApi(map);
  }, []);

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
    console.log("comming TO render directions")
    if(mapsApi==null || map == null) return;
    ListPlaces = ListPlaces.filter(place => {
      let lat = parseFloat(place.lat);
      let lng = parseFloat(place.lng);
      return !isNaN(lat) && !isNaN(lng);
    });
    
    console.log({ListPlaces})
    if(!ListPlaces || ListPlaces.length < 2){
      ListPlaces = [{lat: 37.77, lng: -122.447}, { lat: 37.79, lng: -122.41 }, { lat: 37.79, lng: -122.41 }, {lat: 37.768, lng: -122.511 }]
    }
    directionsRenderer?.setMap(null);
    let n = ListPlaces.length;
    const waypts = ListPlaces.slice(1, n-1).map(place => {
      return {
        location: { lat: place.lat, lng: place.lng },
        stopover: true,
      }
    });
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
          directionsRenderer.setDirections(response);
          console.log(response?.routes[0].legs[0].steps[0].instructions    )
          const stepInstructions = response?.routes[0].legs.map(leg => leg.steps.map(step => step.instructions));
          setDirections(...stepInstructions);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
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
            onClick={() => { console.log("hello"); setSelectedPlace(place); console.log(place) }}
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