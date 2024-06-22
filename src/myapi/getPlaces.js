import axios from "axios";  
import { useState } from "react";



export default async function getPlaces({bounds , Place}) {
    const options = {
      method: 'GET',
      url: `https://travel-advisor.p.rapidapi.com/${Place}/list-in-boundary`,
      params: {
        limit: '50',
        bl_latitude: bounds.bl.lat,
        tr_latitude: bounds.tr.lat,
        bl_longitude: bounds.bl.lng,
        tr_longitude: bounds.tr.lng
      },  
      headers: {
        'X-RapidAPI-Key': '4a40c8cb35mshe2f55ccd422882ep1a3539jsn4a44c2a814f5',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      } 
    };  
    try {
        const  response = await axios.request(options);
        console.log("api called ")
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return { data: [] };
    }
    }