'use client';

import React, { FormEvent, useState, useEffect } from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';
import ThankYouMessage from '@/components/ThankYouMessage'; // Adjust the import path as needed
import { auth, db } from '../../../connection'; // Adjust the import path as needed
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function MusicSchoolContactUs() {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        const storedEmail = user.email;
        console.log(storedEmail)
        if (storedEmail) {
          setEmail(storedEmail);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Submitted:', { email, message });

    try {
      console.log(user.uid);
      await addDoc(collection(db, 'responses'), {
        email,
        message,
        userId: user ? user.uid : 'anonymous',
        timestamp: new Date(),
      });
      console.log("Message sent");
      setSubmitted(true);
    } catch (error) {
      console.error('Error storing response:', error);
    }
  };

  if (submitted) {
    return <ThankYouMessage />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 pt-36 relative">
      <BackgroundBeams className="absolute top-0 left-0 w-full h-full z-0" />
      <div className="max-w-2xl mx-auto p-4 relative z-10">
        <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">
          Contact Us
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">
          We&apos;re here to help with any questions about our courses, programs, or events. Reach out and let us know how we can assist you in your musical journey.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full p-4 bg-neutral-950 placeholder:text-neutral-700 text-white"
            rows={5}
            required
          ></textarea>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default MusicSchoolContactUs;