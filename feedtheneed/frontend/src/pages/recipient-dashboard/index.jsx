import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../../context/AuthContext';

import DashboardHeader from './components/DashboardHeader.jsx';
import DashboardNav from './components/DashboardNav.jsx';
import DonationList from './components/DonationList.jsx';
import MyRequests from './components/MyRequests.jsx';

const RecipientDashboardPage = () => {
      const [view, setView] = useState('donations');
      const [availableDonations, setAvailableDonations] = useState([]);
      const [userRequests, setUserRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUserDataoaded, setIsUserDataLoaded] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth(); // The user object now contains { token, role, userId }
<<<<<<< HEAD
  const { user } = useAuth();
=======
    
>>>>>>> ab3f71a (changes updated)

    useEffect(() => {
        // Run this effect once when the component mounts
        if (user && user.userId) { // Check for userId to ensure context is ready
            fetchData();
        } else {
            setLoading(false);
        }
    }, []); // Empty array ensures it runs only once

    const fetchData = async () => {
        if (isUserDataoaded) return; // Prevent re-fetching if already in a fetch cycle
        setLoading(true);
        setError(null);
        try {
            // --- ADAPTED API CALLS ---
            const [allDonationsResponse, requestsResponse] = await Promise.all([
                // 1. Fetch ALL donations (as per your donationRoute.js)
                api.get('/donations'),
                // 2. Fetch requests for the specific logged-in user
                api.get(`/requests`)
            ]);

            const allDonationsFromApi = allDonationsResponse;

            // 3. Filter the donations on the frontend
            const filteredDonations = allDonationsFromApi.filter(donation =>
                donation.status === 'active' && donation.quantity > 0
            );

            setAvailableDonations(filteredDonations);
            setUserRequests(requestsResponse);

        } catch (err) {
            setError(err.message || 'Failed to fetch data.');
            console.error(err);
        } finally {
            setLoading(false);
            setIsUserDataLoaded(true);
        }
    };

    const handleRequestDonation = async (donationId) => {
        try {
            // 4. Use the correct POST route for creating a request
            // Your backend's addRequest service will use the user ID from the auth token
            await api.post('/requests', { donationId });
            alert('Your request has been submitted successfully!');
            // Refresh data to show the new request
            fetchData();
        } catch (err) {
            alert(err.message || 'Failed to submit request.');
            console.error(err);
        }
    };

    if (loading) {
        return <div className="text-center p-12 font-semibold text-gray-500">Loading Dashboard...</div>;
    }
    if (error) {
        return <div className="text-center p-12 font-semibold text-red-600">{error}</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm-px-6 lg:px-8 py-12">
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

}
export default RecipientDashboardPage;