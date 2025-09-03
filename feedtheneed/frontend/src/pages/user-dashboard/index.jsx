import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import WelcomeHeader from './components/WelcomeHeader';
import QuickActionCards from './components/QuickActionCards';
import RecentActivityFeed from './components/RecentActivityFeed';
import UpcomingSchedule from './components/UpcomingSchedule';
import NotificationCenter from './components/NotificationCenter';
import ImpactVisualization from './components/ImpactVisualization';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data - replace with actual authentication context
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    role: "donor", // 'donor' or 'recipient'
    avatar: null,
    location: "San Francisco, CA",
    joinedDate: "2024-01-15",
    verified: true
  };

  // Mock user statistics
  const mockUserStats = {
    totalDonations: 47,
    peopleHelped: 156,
    impactScore: 892,
    streak: 12
  };

  // Mock recent activities
  const mockActivities = [
    {
      id: 1,
      type: 'donation',
      title: 'Fresh Vegetables Donated',
      description: 'Successfully donated 15 lbs of fresh vegetables to Downtown Food Bank',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      location: 'Downtown Food Bank',
      status: 'completed',
      actionable: true
    },
    {
      id: 2,
      type: 'match',
      title: 'New Match Found',
      description: 'Your bread donation has been matched with Sunrise Community Center',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      location: 'Sunrise Community Center',
      status: 'pending',
      actionable: true
    },
    {
      id: 3,
      type: 'pickup',
      title: 'Pickup Scheduled',
      description: 'Pickup confirmed for tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      location: 'Main Street Bakery',
      status: 'confirmed',
      actionable: false
    },
    {
      id: 4,
      type: 'message',
      title: 'Message from Recipient',
      description: 'Thank you message received from Hope Kitchen',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      location: 'Hope Kitchen',
      status: 'read',
      actionable: true
    },
    {
      id: 5,
      type: 'update',
      title: 'Profile Updated',
      description: 'Your donor profile information has been updated successfully',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      status: 'completed',
      actionable: false
    }
  ];

  // Mock upcoming schedule
  const mockScheduleItems = [
    {
      id: 1,
      type: 'pickup',
      title: 'Bakery Surplus Pickup',
      datetime: new Date(Date.now() + 86400000), // Tomorrow
      location: 'Golden Gate Bakery, 1234 Market St',
      contact: 'Mike Chen',
      items: 25,
      status: 'confirmed',
      notes: 'Please bring insulated bags. Pickup from back entrance.'
    },
    {
      id: 2,
      type: 'delivery',
      title: 'Community Center Delivery',
      datetime: new Date(Date.now() + 172800000), // Day after tomorrow
      location: 'Sunset Community Center, 567 Irving St',
      contact: 'Lisa Rodriguez',
      items: 12,
      status: 'pending',
      notes: 'Delivery window: 10 AM - 12 PM'
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Volunteer Orientation',
      datetime: new Date(Date.now() + 432000000), // 5 days from now
      location: 'PlateFullPromise Office, 890 Mission St',
      contact: 'David Park',
      status: 'confirmed',
      notes: 'Bring ID and signed waiver form'
    }
  ];

  // Mock notifications
  const mockNotifications = [
    {
      id: 1,
      type: 'match',
      title: 'New Donation Match',
      message: 'Your fresh produce donation has been matched with 3 local recipients',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      read: false,
      priority: 'normal',
      actionable: true
    },
    {
      id: 2,
      type: 'message',
      title: 'Thank You Message',
      message: 'Hope Kitchen sent you a thank you message for your recent donation',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      read: false,
      priority: 'normal',
      actionable: true
    },
    {
      id: 3,
      type: 'pickup',
      title: 'Pickup Reminder',
      message: 'Don\'t forget your scheduled pickup tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: true,
      priority: 'high',
      actionable: true
    },
    {
      id: 4,
      type: 'system',
      title: 'Profile Verification Complete',
      message: 'Your donor profile has been successfully verified',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: true,
      priority: 'normal',
      actionable: false
    },
    {
      id: 5,
      type: 'success',
      title: 'Impact Milestone Reached',
      message: 'Congratulations! You\'ve helped feed 150+ people this month',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: false,
      priority: 'normal',
      actionable: false
    }
  ];

  // Mock impact data
  const mockImpactData = {
    monthlyData: [
      { month: 'Jan', donations: 8, received: 12 },
      { month: 'Feb', donations: 12, received: 18 },
      { month: 'Mar', donations: 15, received: 22 },
      { month: 'Apr', donations: 18, received: 28 },
      { month: 'May', donations: 22, received: 35 },
      { month: 'Jun', donations: 25, received: 40 }
    ],
    categoryData: [
      { name: 'Fresh Produce', value: 35 },
      { name: 'Baked Goods', value: 28 },
      { name: 'Dairy Products', value: 15 },
      { name: 'Prepared Meals', value: 12 },
      { name: 'Canned Goods', value: 10 }
    ],
    trendData: [
      { week: 'Week 1', impact: 45 },
      { week: 'Week 2', impact: 52 },
      { week: 'Week 3', impact: 48 },
      { week: 'Week 4', impact: 65 },
      { week: 'Week 5', impact: 58 },
      { week: 'Week 6', impact: 72 }
    ],
    totalPeopleHelped: 156,
    totalMeals: 423,
    wasteReduced: 89,
    impactScore: 892
  };

  useEffect(() => {
    // Simulate loading user data
    const loadUserData = async () => {
      try {
        // Mock API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser(mockUser);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-text-secondary mb-4">Unable to load user data</p>
            <button 
              onClick={() => window.location?.reload()} 
              className="text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <WelcomeHeader user={user} userStats={mockUserStats} />

          {/* Quick Action Cards */}
          <QuickActionCards user={user} />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Recent Activity Feed - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <RecentActivityFeed user={user} activities={mockActivities} />
            </div>

            {/* Upcoming Schedule - Takes 1 column */}
            <div className="lg:col-span-1">
              <UpcomingSchedule user={user} scheduleItems={mockScheduleItems} />
            </div>
          </div>

          {/* Secondary Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Notification Center */}
            <div>
              <NotificationCenter notifications={mockNotifications} />
            </div>

            {/* Impact Visualization */}
            <div>
              <ImpactVisualization user={user} impactData={mockImpactData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;