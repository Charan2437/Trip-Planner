import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDSEng_KzYUgAyJpuD4UNQVOGXmvgPM3zg",
  authDomain: "ai-travel-407815.firebaseapp.com",
  projectId: "ai-travel-407815",
  storageBucket: "ai-travel-407815.appspot.com",
  messagingSenderId: "930815818031",
  appId: "1:930815818031:web:231bd528649301c9e109da",
  measurementId: "G-SK1F3ZBG24"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;

// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
// export const db = getFirestore(app);
// export default app;
