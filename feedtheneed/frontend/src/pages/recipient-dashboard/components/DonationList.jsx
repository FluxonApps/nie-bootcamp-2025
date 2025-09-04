// src/components/DonationList.jsx

import React from 'react';

const DonationList = ({ donations, onRequest }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Donations</h2>
      {donations.length === 0 ? (
        <p className="text-gray-500">No donations are available at the moment. Please check back later.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.map((donation) => (
            <div key={donation._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              {/* Placeholder image using category */}
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-lg font-semibold">{donation.category}</span>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                {/* Category badge */}
                <span className="text-sm font-semibold text-green-600 bg-green-100 py-1 px-3 rounded-full self-start">
                  {donation.category}
                </span>

                {/* Description and Quantity */}
                <p className="text-lg font-semibold text-gray-800 mt-4 mb-2 flex-grow">{donation.description}</p>
                <p className="text-md text-gray-700 font-bold">
                  Quantity Available: <span className="text-green-600">{donation.quantity}</span>
                </p>

                <button
                  onClick={() => onRequest(donation._id)}
                  className="mt-6 w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Request this Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationList;