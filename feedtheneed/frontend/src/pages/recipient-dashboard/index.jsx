// src/pages/recipient-dashboard/index.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

// These import paths must match your structure exactly
import DashboardHeader from './components/DashboardHeader.jsx';
import DashboardNav from './components/DashboardNav.jsx';
import DonationList from './components/DonationList.jsx';
import MyRequests from './components/MyRequests.jsx';

const RecipientDashboardPage = () => {
  const [view, setView] = useState('donations');
  const [availableDonations, setAvailableDonations] = useState([]);
  const [userRequests, setUserRequests] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      try {
        // GET available donations (status active)
        const res = await fetch('http://localhost:8002/api/donations', {
          headers: { Authorization: `Bearer ${user?.token || localStorage.getItem('token')}` },
        });
        const data = await res.json();
        const active = Array.isArray(data) ? data.filter(d => (d.status || '').toLowerCase() === 'active') : [];
        setAvailableDonations(active);
      } catch (e) {
        setAvailableDonations([]);
      }
    };
    load();
  }, [user?.token]);

  const handleRequestDonation = async (donationId) => {
    const donationToRequest = availableDonations.find(d => d._id === donationId);
    if (!donationToRequest) return;

    try {
      const res = await fetch('http://localhost:8002/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token || localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ donationId }),
      });
      if (!res.ok) throw new Error('Failed to request donation');
      const created = await res.json();

      setUserRequests(prev => [...prev, created]);
      setAvailableDonations(prev => prev.filter(d => d._id !== donationId));
      alert('Request submitted. Pending approval.');
    } catch (e) {
      alert(e.message || 'Unable to request donation');
    }
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