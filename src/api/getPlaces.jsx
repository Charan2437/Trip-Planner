import axios from "axios";  
import { useState } from "react";
import Script from "next/script";

    export default async function getPlaces({bounds}) {

    //     const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
    //         "places",
    //       );
    // const center = {
    //     lat: (bounds.bl.lat + bounds.tr.lat) / 2,
    //     lng: (bounds.bl.lng + bounds.tr.lng) / 2,
    // };

    // const request = {
    //     fields: ["displayName", "location", "businessStatus"],
    //     locationRestriction: {
    //         center: center,
    //         radius: 500,
    //     },
    //     includedPrimaryTypes: ["restaurant"],
    //     maxResultCount: 5,
    //     language: "en-US",
    //     region: "us",
    // };

    // try {
    //     const { places } = await Place.searchNearby(request);
    //     console.log("API called");
    //     console.log({ places })
    //     return places;
    // } catch (error) {
    //     console.error(error);
    //     return [];
    // }
    const obj ={
        "places": [
            {
                "businessStatus": "OPERATIONAL",
                "id": "ChIJkWkDnDlXqDsRQ-iGHkFTFUk",
                "displayName": "Street Arabiya Ramanathapuram",
                "location": {
                    "lat": 10.9973612,
                    "lng": 77.0115996
                }
            },
            {
                "businessStatus": "OPERATIONAL",
                "id": "ChIJ5-27NsNZqDsRDVVGWvfrkB4",
                "displayName": "Bon pizza",
                "location": {
                    "lat": 10.9977556,
                    "lng": 77.013964
                }
            },
            {
                "businessStatus": "OPERATIONAL",
                "id": "ChIJc3ze3wlXqDsRMSR5Pe47A9Q",
                "displayName": "Crimson dragon Chinese restaurant",
                "location": {
                    "lat": 10.9982068,
                    "lng": 77.0154563
                }
            },
            {
                "businessStatus": "OPERATIONAL",
                "id": "ChIJofNgWjhXqDsRJiTDf2-4tJA",
                "displayName": "TACO LA",
                "location": {
                    "lat": 10.998164599999999,
                    "lng": 77.0152383
                }
            },
            {
                "businessStatus": "OPERATIONAL",
                "id": "ChIJueCWevBXqDsRDiWr2_p2pTs",
                "displayName": "Arabian Hunt",
                "location": {
                    "lat": 10.9984537,
                    "lng": 77.0166484
                }
            }
        ]
    };
    return obj.places;
}