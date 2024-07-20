"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../../../components/ui/placeholders-and-vanish-input";

function Page() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");

  const placeholders = [
    "Plan me a trip to Paris",
    "Best time to visit Ooty",
    "Opening and closing times of India Gate",
    "What is the best time to visit India Gate",
    "Places to visit in India",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Ask Trippy for your Trip Suggestions
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
      {response && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold">Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Page;
