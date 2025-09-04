// src/components/MyRequests.jsx

import React from 'react';

const MyRequests = ({ requests }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'fulfilled': return 'text-blue-600 bg-blue-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Requested Items</h2>
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-gray-500">You have not requested any items yet.</p>
        ) : (
          requests.map((request) => (
            <div key={request._id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
              <div className="flex items-center">
                {/* Placeholder square */}
                <div className="w-16 h-16 bg-gray-100 rounded-md mr-4 flex items-center justify-center text-center p-1">
                   <span className="text-gray-500 text-xs font-semibold">{request.donation.category}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{request.donation.description}</h3>
                  <p className="text-gray-500 text-sm">Requested on: {new Date(request.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <p className={`font-medium text-sm py-1 px-3 rounded-full ${getStatusColor(request.status)}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyRequests;