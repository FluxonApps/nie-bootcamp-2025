// src/pages/recipient-dashboard/index.jsx

import React, { useState, useEffect } from 'react';

// These import paths must match your structure exactly
import DashboardHeader from './components/DashboardHeader.jsx';
import DashboardNav from './components/DashboardNav.jsx';
import DonationList from './components/DonationList.jsx';
import MyRequests from './components/MyRequests.jsx';

const RecipientDashboardPage = () => {
  const [view, setView] = useState('donations');
  const [availableDonations, setAvailableDonations] = useState([]);
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    const dummyDonations = [
      { _id: 'd1', description: 'A weekly box of assorted fresh vegetables.', category: 'Food', quantity: 5 },
      { _id: 'd2', description: 'Men\'s size large, gently used winter jacket.', category: 'Clothing', quantity: 1 },
      { _id: 'd3', description: 'A set of 10 classic storybooks for ages 4-8.', category: 'Education', quantity: 3 },
    ];
    
    const dummyRequests = [
      { _id: 'r1', donation: dummyDonations[1], status: 'pending', createdAt: new Date() }
    ];

    setAvailableDonations(dummyDonations);
    setUserRequests(dummyRequests);
  }, []);

  const handleRequestDonation = (donationId) => {
    const donationToRequest = availableDonations.find(d => d._id === donationId);
    if (!donationToRequest) return;
    
    alert(`You have requested: "${donationToRequest.description}".`);
    
    const newRequest = {
        _id: `r${Math.random()}`,
        donation: donationToRequest,
        status: 'pending',
        createdAt: new Date(),
    };

    setUserRequests(prev => [...prev, newRequest]);
    setAvailableDonations(prev => prev.filter(d => d._id !== donationId));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardHeader />
        <DashboardNav activeView={view} onViewChange={setView} />
        <div>
          {view === 'donations' && (
            <DonationList donations={availableDonations} onRequest={handleRequestDonation} />
          )}
          {view === 'myRequests' && <MyRequests requests={userRequests} />}
        </div>
      </div>
    </div>
  );
};

export default RecipientDashboardPage;