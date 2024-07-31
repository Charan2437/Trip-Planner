'use client';

import { TypewriterEffect } from "./ui/typewriter-effect";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../connection"; // Adjust the path as necessary
import { useRouter } from 'next/navigation';

export function TypewriterEffectDemo() {
  const words = [
    { text: "Welcome" },
    { text: "To" },
    { text: "Trippy!!" },
    { text: "Lets" },
    { text: "Explore" },
    { text: "This" },
    { text: "Globe" },
  ];

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      localStorage.removeItem('user'); // Clear user details from localStorage
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  const handleSignUpClick = () => {
    router.push('/login');
  };

  const notLoggined = () => {
    router.push('/login');
  };

  const signedIn = () => {
    router.push('/form');
  };

  return (
    <div className="flex flex-col mt-20 items-center justify-center h-[20rem]">
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        {isAuthenticated ? (
          <>
            <button
              className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
              onClick={signedIn}
            >
              Plan Now
            </button>
            <button
              className="w-40 h-10 rounded-xl bg-red-500 text-white border border-transparent text-sm"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
              onClick={notLoggined}
            >
              Plan Now
            </button>
            <button
              className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}