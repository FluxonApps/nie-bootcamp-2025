import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MetricsCard from './components/MetricsCard';
import UserManagementTable from './components/UserManagementTable';
import ActivityFeed from './components/ActivityFeed';
import PendingTasks from './components/PendingTasks';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Replace with backend metrics later
  const platformMetrics = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Active Donations",
      value: "156",
      change: "+8%",
      changeType: "positive",
      icon: "Package",
      color: "success"
    },
    {
      title: "Successful Matches",
      value: "1,234",
      change: "+15%",
      changeType: "positive",
      icon: "CheckCircle",
      color: "secondary"
    }
  ];

  const quickActions = [
    {
      title: "User Reports",
      description: "Generate user activity reports",
      icon: "FileText",
      action: () => console.log("Generate reports")
    },
    {
      title: "Send Notifications",
      description: "Broadcast to all users",
      icon: "Bell",
      action: () => console.log("Send notifications")
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-text-secondary">
                  Welcome back! Here’s what’s happening on <strong>FeedTheNeed</strong> today.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-text-secondary">Current Time</p>
                  <p className="font-semibold text-text-primary">
                    {currentTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {currentTime?.toLocaleDateString()}
                  </p>
                </div>
                <Button variant="default" iconName="Plus">
                  Quick Action
                </Button>
              </div>
            </div>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {platformMetrics.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* User Management */}
            <div className="xl:col-span-2">
              <UserManagementTable />
            </div>

            {/* Activity + Tasks */}
            <div className="space-y-6">
              <ActivityFeed />
              <PendingTasks />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-lg shadow-soft p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="p-4 border border-border rounded-lg hover:shadow-soft transition-all duration-200 hover:border-primary/20 text-left group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon name={action.icon} size={20} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-1">{action.title}</h3>
                  <p className="text-sm text-text-secondary">{action.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
