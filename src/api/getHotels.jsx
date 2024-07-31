import axios from "axios";  
import { useState } from "react";
import Script from "next/script";

    export default async function getHotels({bounds}) {

        const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
            "places",
          );

          const center = {
            lat: (bounds.south + bounds.north) / 2,
            lng: (bounds.west + bounds.east) / 2,
          };
    const request = {
        fields: ["displayName", "location", "businessStatus","photos","priceLevel","rating","userRatingCount","websiteURI","hasWiFi","editorialSummary","servesBreakfast","servesLunch","servesDinner","hasDineIn","servesVegetarianFood","types"],
        locationRestriction: {
            center: center,
            radius: 5000,
        },
        includedPrimaryTypes : [
            "bed_and_breakfast",
            "campground",
            "camping_cabin",
            "cottage",
            "extended_stay_hotel",
            "farmstay",
            "guest_house",
            "hostel",
            "hotel",
            "lodging",
            "motel",
            "private_guest_room",
            "resort_hotel",
            "rv_park"
          ],
          
        maxResultCount: 4,
        rankPreference: SearchNearbyRankPreference.POPULARITY,
        language: "en-US",
        region: "us",
    };

    try {
        const { places } = await Place.searchNearby(request);
        return places;
    } catch (error) {
        console.error(error);
        return [];
    }
}



//     "places": [
//         {
//             "businessStatus": "OPERATIONAL",
//             "id": "ChIJxdQ0SLFXqDsRLJcK0cRP7mM",
//             "displayName": "Courtallam Border Rahmath Kadai - Avinashi Road",
//             "location": {
//                 "lat": 11.045947300000002,
//                 "lng": 77.05191599999999
//             }
//         },
//         {
//             "businessStatus": "OPERATIONAL",
//             "id": "ChIJVU2Qc89XqDsRgwrPoppoQko",
//             "displayName": "ARS RESTAURANT",
//             "location": {
//                 "lat": 11.0448326,
//                 "lng": 77.04791240000002
//             }
//         },
//         {
//             "businessStatus": "OPERATIONAL",
//             "id": "ChIJWQAXDDBXqDsRRKZMf8KiFlg",
//             "displayName": "Hotel Varakhi",
//             "location": {
//                 "lat": 11.0465283,
//                 "lng": 77.05127150000001
//             }
//         },
//         {
//             "businessStatus": "OPERATIONAL",
//             "id": "ChIJYxUnr85XqDsRLsTJVQ9nrqY",
//             "displayName": "Sri Veerakumar Mess",
//             "location": {
//                 "lat": 11.045714,
//                 "lng": 77.0501079
//             }
//         },
//         {
//             "businessStatus": "OPERATIONAL",
//             "id": "ChIJk2iJn1VXqDsR7b1w4Z4Bka4",
//             "displayName": "Velan cafe and restaurant",
//             "location": {
//                 "lat": 11.0452613,
//                 "lng": 77.0495122
//             }
//         }
//     ]
// }

