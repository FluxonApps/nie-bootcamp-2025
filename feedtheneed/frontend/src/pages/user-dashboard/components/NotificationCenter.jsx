import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications }) => {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const getNotificationIcon = (type) => {
    const iconMap = {
      match: 'Heart',
      message: 'MessageCircle',
      pickup: 'Truck',
      system: 'Bell',
      alert: 'AlertTriangle',
      success: 'CheckCircle'
    };
    return iconMap?.[type] || 'Bell';
  };

  const getNotificationColor = (type, priority) => {
    if (priority === 'high') return 'text-destructive';
    
    const colorMap = {
      match: 'text-accent',
      message: 'text-primary',
      pickup: 'text-secondary',
      system: 'text-text-secondary',
      alert: 'text-warning',
      success: 'text-success'
    };
    return colorMap?.[type] || 'text-text-secondary';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications?.filter(notification => 
        filter === 'unread' ? !notification?.read : notification?.type === filter
      );

  const displayedNotifications = showAll 
    ? filteredNotifications 
    : filteredNotifications?.slice(0, 5);

  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'unread', label: `Unread (${unreadCount})` },
    { value: 'match', label: 'Matches' },
    { value: 'message', label: 'Messages' },
    { value: 'system', label: 'System' }
  ];

  const markAsRead = (notificationId) => {
    // Mock function - would update notification status
    console.log('Mark as read:', notificationId);
  };

  const markAllAsRead = () => {
    // Mock function - would mark all notifications as read
    console.log('Mark all as read');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-bold text-text-primary">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-destructive text-white text-xs font-bold px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
          <Button variant="ghost" size="sm" iconName="Settings" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {filterOptions?.map((option) => (
          <Button
            key={option?.value}
            variant={filter === option?.value ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter(option?.value)}
          >
            {option?.label}
          </Button>
        ))}
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {displayedNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary mb-2">No notifications</p>
            <p className="text-sm text-text-secondary">
              You're all caught up! New notifications will appear here.
            </p>
          </div>
        ) : (
          displayedNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`flex items-start space-x-3 p-3 rounded-lg transition-smooth hover:bg-muted cursor-pointer ${
                !notification?.read ? 'bg-primary/5 border-l-4 border-l-primary' : ''
              }`}
              onClick={() => markAsRead(notification?.id)}
            >
              <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getNotificationColor(notification?.type, notification?.priority)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-sm font-medium ${!notification?.read ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {notification?.title}
                  </p>
                  <span className="text-xs text-text-secondary">
                    {formatTimeAgo(notification?.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary line-clamp-2">
                  {notification?.message}
                </p>
                {notification?.actionable && (
                  <div className="mt-2">
                    <Button variant="ghost" size="sm" iconName="ExternalLink">
                      View Details
                    </Button>
                  </div>
                )}
              </div>
              {!notification?.read && (
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              )}
            </div>
          ))
        )}
      </div>
      {filteredNotifications?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button
            variant="ghost"
            fullWidth
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
          >
            {showAll ? 'Show Less' : `Show ${filteredNotifications?.length - 5} More`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;