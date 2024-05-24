
"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const tripPlannerContent = [
  {
    title: 'Personalized Trip Planning Experience',
    description:
      'Embark on a journey tailored specifically to your preferences and interests. Our AI-powered trip planner creates personalized itineraries that reflect your unique travel style, ensuring every aspect of your trip is designed with you in mind.',
  },
  {
    title: 'Effortless Itinerary Creation',
    description:
      'Say goodbye to the hassle of planning every detail of your trip. Our intuitive platform streamlines the itinerary creation process, taking care of everything from transportation and accommodations to activities and dining options.',
  },
  {
    title: 'Real-Time Recommendations and Adjustments',
    description:
      'Experience the convenience of receiving real-time recommendations and adjustments based on changing circumstances or your evolving interests. Our AI continuously analyzes data to optimize your itinerary, ensuring you make the most of every moment.',
  },
  {
    title: 'Seamless Integration with Travel Partners',
    description:
      'Enjoy seamless integration with our network of travel partners, allowing you to book flights, accommodations, and activities directly through our platform. With everything in one place, managing your trip has never been easier.',
  },
  {
    title: 'Expert Guidance at Your Fingertips',
    description:
      'Access expert guidance and travel tips at your fingertips, empowering you to make informed decisions throughout your journey. Whether you’re a seasoned traveler or planning your first adventure, our platform provides the support you need.',
  },
  {
    title: 'Unparalleled Flexibility and Customization',
    description:
      'Experience unparalleled flexibility and customization options that cater to your changing needs and preferences. Whether you prefer to stick to a strict schedule or go with the flow, our AI adapts to your style, ensuring a stress-free travel experience.',
  },
];


function WhyChooseUs() {
  return (
    <div>
        <StickyScroll content={tripPlannerContent} />
    </div>
  )
}

export default WhyChooseUs