// src/pages/recipient-dashboard/components/MyRequests.jsx

import React from 'react';

// --- FIX #1: Provide a default empty array for the 'requests' prop ---
// If the parent component passes `undefined` for requests, this component
// will use `[]` instead, preventing the '.length' error.
const MyRequests = ({ requests = [] }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'fulfilled':
        return 'text-blue-600 bg-blue-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      case 'pending':
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Requested Items</h2>
      <div className="space-y-4">
        {/* This check is now safe. If requests is empty, [].length is 0. */}
        {requests.length === 0 ? (
          <p className="text-gray-500">You have not requested any items yet. Browse the "Available Donations" to get started.</p>
        ) : (
          requests.map((request) => {
            // --- FIX #2: Defensive Coding ---
            // This ensures that if a request object is missing its 'donationId'
            // for any reason, the component will not crash when trying to access
            // properties like donation.category or donation.description.
            const donation = request.donation || {};
            
            // Your requestModel.js uses 'CreatedAt' (capital C, A), so we'll use that.
            const requestDate = request.CreatedAt ? new Date(request.CreatedAt).toLocaleDateString() : 'N/A';

            return (
              <div key={request._id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-md mr-4 flex items-center justify-center text-center p-1">
                    <span className="text-gray-500 text-xs font-semibold">{donation.category || 'N/A'}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{donation.description || 'Donation details not available'}</h3>
                    <p className="text-gray-500 text-sm">Requested on: {requestDate}</p>
                  </div>
                </div>
                <p className={`font-medium text-sm py-1 px-3 rounded-full ${getStatusColor(request.status)}`}>
                  {request.status ? request.status.charAt(0).toUpperCase() + request.status.slice(1) : 'Unknown'}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyRequests;