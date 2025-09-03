import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const QuickActionCards = ({ user }) => {
  const navigate = useNavigate();

  const donorActions = [
    {
      id: 'post-donation',
      title: 'Post New Donation',
      description: 'Share surplus food with those in need',
      icon: 'Plus',
      color: 'bg-success',
      action: () => navigate('/post-donation')
    },
    {
      id: 'manage-donations',
      title: 'Manage Donations',
      description: 'View and update your active donations',
      icon: 'Package',
      color: 'bg-primary',
      action: () => navigate('/manage-donations')
    },
    {
      id: 'donation-history',
      title: 'Donation History',
      description: 'Track your contribution impact',
      icon: 'History',
      color: 'bg-secondary',
      action: () => navigate('/donation-history')
    },
    {
      id: 'profile-settings',
      title: 'Profile Settings',
      description: 'Update your donor information',
      icon: 'Settings',
      color: 'bg-accent',
      action: () => navigate('/profile-settings')
    }
  ];

  const recipientActions = [
    {
      id: 'browse-food',
      title: 'Browse Available Food',
      description: 'Find fresh donations near you',
      icon: 'Search',
      color: 'bg-success',
      action: () => navigate('/browse-food')
    },
    {
      id: 'my-requests',
      title: 'My Requests',
      description: 'View your food requests and status',
      icon: 'ShoppingBag',
      color: 'bg-primary',
      action: () => navigate('/my-requests')
    },
    {
      id: 'pickup-schedule',
      title: 'Pickup Schedule',
      description: 'Manage your pickup appointments',
      icon: 'Calendar',
      color: 'bg-secondary',
      action: () => navigate('/pickup-schedule')
    },
    {
      id: 'profile-settings',
      title: 'Profile Settings',
      description: 'Update your recipient information',
      icon: 'Settings',
      color: 'bg-accent',
      action: () => navigate('/profile-settings')
    }
  ];

  const actions = user?.role === 'donor' ? donorActions : recipientActions;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-text-primary mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <div
            key={action?.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-elevated transition-smooth cursor-pointer group"
            onClick={action?.action}
          >
            <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth`}>
              <Icon name={action?.icon} size={24} color="white" />
            </div>
            <h3 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-smooth">
              {action?.title}
            </h3>
            <p className="text-sm text-text-secondary">
              {action?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionCards;