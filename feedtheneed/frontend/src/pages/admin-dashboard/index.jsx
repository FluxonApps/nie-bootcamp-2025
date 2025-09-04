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
  const [users, setUsers] = useState([]);   // all users
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8002/api/users");
      const data = await res.json();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // split donors & recipients
  const donors = users.filter(u => u.role === "donor");
  const recipients = users.filter(u => u.role === "recipient");

  const platformMetrics = [
    { title: "Total Users", value: users.length, change: "+12%", changeType: "positive", icon: "Users", color: "primary" },
    { title: "Donors", value: donors.length, change: "+5%", changeType: "positive", icon: "Package", color: "success" },
    { title: "Recipients", value: recipients.length, change: "+7%", changeType: "positive", icon: "Gift", color: "secondary" }
  ];

  const quickActions = [
    { title: "User Reports", description: "Generate user activity reports", icon: "FileText", action: () => console.log("Generate reports") },
    { title: "Send Notifications", description: "Broadcast to all users", icon: "Bell", action: () => console.log("Send notifications") }
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
              <p className="text-text-secondary">
                Welcome back! Manage donors and recipients separately.
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
              <Button variant="default" iconName="Plus">Quick Action</Button>
            </div>
          </div>

          {/* Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {platformMetrics.map((metric, index) => (
              <MetricsCard key={index} {...metric} />
            ))}
          </div>

          {/* Donors Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Donors</h2>
            {loading ? (
              <p className="text-center text-gray-500">Loading donors...</p>
            ) : (
              <UserManagementTable users={donors} refreshUsers={fetchUsers} />
            )}
          </div>

          {/* Recipients Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Recipients</h2>
            {loading ? (
              <p className="text-center text-gray-500">Loading recipients...</p>
            ) : (
              <UserManagementTable users={recipients} refreshUsers={fetchUsers} />
            )}
          </div>

          {/* Side Widgets */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            <div className="xl:col-span-2"></div>
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
