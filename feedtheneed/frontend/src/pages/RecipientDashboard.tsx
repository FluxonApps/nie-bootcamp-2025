import React, { useState, useEffect } from 'react';
import DonationList, { Donation } from './DonationList'; // Imports the updated Donation type
import MyRequests, { UserRequest } from './MyRequests';

type View = 'donations' | 'myRequests';

const RecipientDashboard: React.FC = () => {
  const [view, setView] = useState<View>('donations');
  const [availableDonations, setAvailableDonations] = useState<Donation[]>([]);
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);

  useEffect(() => {
    // STEP 4: Update the dummy data to match the schema
    const dummyDonations: Donation[] = [
      { _id: 'd1', description: 'A weekly box of assorted fresh vegetables from a local farm.', category: 'Food', quantity: 5 },
      { _id: 'd2', description: 'Men\'s size large, gently used winter jacket. Very warm.', category: 'Clothing', quantity: 1 },
      { _id: 'd3', description: 'A set of 10 classic storybooks for ages 4-8.', category: 'Education', quantity: 3 },
    ];
    
    const dummyRequests: UserRequest[] = [
        { _id: 'r1', donation: dummyDonations[1], status: 'pending', createdAt: new Date() }
    ];

    setAvailableDonations(dummyDonations);
    setUserRequests(dummyRequests);
  }, []);

  const handleRequestDonation = (donationId: string) => {
    const donationToRequest = availableDonations.find(d => d._id === donationId);
    if (!donationToRequest) return;
    
    alert(`You have requested: "${donationToRequest.description}". You can track its status in "My Requests".`);
    
    const newRequest: UserRequest = {
        _id: `r${Math.random()}`,
        donation: donationToRequest,
        status: 'pending',
        createdAt: new Date(),
    };

    setUserRequests(prev => [...prev, newRequest]);
    setAvailableDonations(prev => prev.filter(d => d._id !== donationId));
  };

  // The JSX for this component (navigation and rendering) does not need to change.
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setView('donations')}
            className={`${ view === 'donations' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
          >
            Available Donations
          </button>
          <button
            onClick={() => setView('myRequests')}
            className={`${ view === 'myRequests' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg`}
          >
            My Requests
          </button>
        </nav>
      </div>

      <div>
        {view === 'donations' && (
          <DonationList donations={availableDonations} onRequest={handleRequestDonation} />
        )}
        {view === 'myRequests' && <MyRequests requests={userRequests} />}
      </div>
    </div>
  );
};

export default RecipientDashboard;