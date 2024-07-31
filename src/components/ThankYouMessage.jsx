import React, { useState } from 'react';

function ThankYouMessage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md mx-auto p-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">Thank You!</h1>
        <p className="text-neutral-500 text-lg mb-8">
          Thank you for sharing your views.
        </p>
        <div className="flex justify-center">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                key={index}
                type="button"
                className={`text-2xl md:text-4xl ${index <= (hover || rating) ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                &#9733;
              </button>
            );
          })}
        </div>
        <p className="text-neutral-500 text-lg mt-4">
          Your rating: {rating} star{rating !== 1 && 's'}
        </p>
        {/* Add a link back to the home page or any other action if needed */}
      </div>
    </div>
  );
}

export default ThankYouMessage;