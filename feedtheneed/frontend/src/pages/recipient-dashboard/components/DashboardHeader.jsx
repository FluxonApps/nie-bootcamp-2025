// src/pages/recipient-dashboard/components/DashboardHeader.jsx

import React from 'react';

const DashboardHeader = () => {
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl font-bold text-gray-800">
        Welcome, <span className="text-green-600">Recipient</span>
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        Browse available donations or track the status of your requests.
      </p>
    </div>
  );
};

export default DashboardHeader;