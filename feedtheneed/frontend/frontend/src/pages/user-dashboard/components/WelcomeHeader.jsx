import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ user, userStats }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US')?.format(num);
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-8">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-white/90 text-base lg:text-lg mb-4">
            {user?.role === 'donor' 
              ? 'Thank you for making a difference in your community' :'Find fresh food donations near you'}
          </p>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatNumber(userStats?.totalDonations)}</div>
              <div className="text-sm text-white/80">
                {user?.role === 'donor' ? 'Donations Made' : 'Items Received'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatNumber(userStats?.peopleHelped)}</div>
              <div className="text-sm text-white/80">People Helped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats?.impactScore}</div>
              <div className="text-sm text-white/80">Impact Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{userStats?.streak}</div>
              <div className="text-sm text-white/80">Day Streak</div>
            </div>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center justify-center w-32 h-32 bg-white/10 rounded-full">
          <Icon name="Heart" size={48} color="white" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;