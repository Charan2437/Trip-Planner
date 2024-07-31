import React from 'react';

const PlaceCard = ({ selectedPlace, addPlan }) => {
  const { displayName, rating, userRatingCount, location, photos, businessStatus, editorialSummary, types } = selectedPlace;

  return (
    <div className="card rounded-lg shadow-md overflow-hidden mb-8" key={selectedPlace.id}>
      {/* Main Photo */}
      {photos[0] && (
        <img
          src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].name}&key=YOUR_API_KEY`}
          alt={displayName}
          className="w-full object-cover h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80"
        />
      )}

      <div className="p-4">
        <h2 className="text-xl mb-2 text-white">{displayName}</h2>
        <p className="text-gray-400 mb-2">Rating: {rating}</p>
        <p className="text-gray-500 mb-4">User Ratings: {userRatingCount}</p>
        <p className="text-gray-500 mb-2">Status: {businessStatus}</p>

        <div className="highlight-bg p-4 rounded-lg shadow-inner mb-4">
          <p className="text-white mb-4">{editorialSummary}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
            className="text-blue-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Map
          </a>
        </div>

        <div className="highlight-bg p-4 rounded-lg shadow-inner mb-4">
          <p className="text-white mb-4">Types: {types.join(', ')}</p>
        </div>

        <div className="highlight-bg p-4 rounded-lg shadow-inner">
          <button onClick={addPlan} className="w-full bg-blue-500 text-white p-2 rounded"> Add to plan </button>
        </div>

        {/* Photo Thumbnails */}
        <div className="flex flex-wrap mt-4">
          {photos.slice(1).map((photo, index) => (
            <img
              key={index}
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo.name}&key=YOUR_API_KEY`}
              alt={`${displayName} ${index + 1}`}
              className="w-1/4 h-24 object-cover m-1 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
