// "use client";

// import { useState } from "react";
// import { PlaceholdersAndVanishInput } from "../../../components/ui/placeholders-and-vanish-input";

// function Page() {
//   const [inputValue, setInputValue] = useState("");
//   const [response, setResponse] = useState("");

//   const placeholders = [
//     "Plan me a trip to Paris",
//     "Best time to visit Ooty",
//     "Opening and closing times of India Gate",
//     "What is the best time to visit India Gate",
//     "Places to visit in India",
//   ];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:4000/api/chatbot", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: inputValue }),
//       });
//       const data = await res.json();
//       setResponse(data.response);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="h-[40rem] flex flex-col justify-center items-center px-4">
//       <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
//         Ask Trippy for your Trip Suggestions
//       </h2>
//       <PlaceholdersAndVanishInput
//         placeholders={placeholders}
//         onChange={handleChange}
//         onSubmit={onSubmit}
//       />
//       {response && (
//         <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
//           <h3 className="text-lg font-semibold">Response:</h3>
//           <p>{response}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Page;
"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

function Page() {
  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState([]);

  const placeholders = [
    "Plan me a trip to Paris",
    "Best time to visit Ooty",
    "Opening and closing times of India Gate",
    "What is the best time to visit India Gate",
    "Places to visit in India",
  ];

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });
      const data = await res.json();
      setConversation((prev) => [
        ...prev,
        { question: inputValue, response: data.response },
      ]);
      setInputValue("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 p-4">
      <h2 className="mb-10 text-3xl sm:text-5xl text-center text-gray-900 dark:text-white">
        Ask Trippy for your Trip Suggestions
      </h2>
      <div className="w-full max-w-3xl p-6 border border-gray-300 rounded-lg bg-white dark:bg-gray-900 shadow-lg">
        <div className="flex flex-col space-y-4 h-96 overflow-y-auto mb-4">
          {conversation.map((chat, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="self-end bg-blue-500 text-white p-3 rounded-lg max-w-xs sm:max-w-md break-words">
                {chat.question}
              </div>
              <div className="self-start bg-gray-300 dark:bg-gray-700 p-3 rounded-lg max-w-xs sm:max-w-md break-words">
                <ReactMarkdown>{chat.response}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholders[Math.floor(Math.random() * placeholders.length)]}
            className="flex-grow p-3 border border-gray-300 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;