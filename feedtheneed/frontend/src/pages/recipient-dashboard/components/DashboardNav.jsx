// src/pages/recipient-dashboard/components/DashboardNav.jsx

import React from 'react';

const DashboardNav = ({ activeView, onViewChange }) => {
  return (
    <div className="mb-8 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 justify-center" aria-label="Tabs">
        <button
          onClick={() => onViewChange('donations')}
          className={`${
            activeView === 'donations'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg focus:outline-none`}
        >
          Available Donations
        </button>
        <button
          onClick={() => onViewChange('myRequests')}
          className={`${
            activeView === 'myRequests'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg focus:outline-none`}
        >
          My Requests
        </button>
      </nav>
    </div>
  );
};

export default DashboardNav;