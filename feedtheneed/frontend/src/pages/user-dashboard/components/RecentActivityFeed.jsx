import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivityFeed = ({ user, activities }) => {
  const [filter, setFilter] = useState('all');

  const getActivityIcon = (type) => {
    const iconMap = {
      donation: 'Package',
      pickup: 'Truck',
      request: 'ShoppingBag',
      match: 'Heart',
      message: 'MessageCircle',
      update: 'Edit'
    };
    return iconMap?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      donation: 'text-success',
      pickup: 'text-primary',
      request: 'text-secondary',
      match: 'text-accent',
      message: 'text-warning',
      update: 'text-text-secondary'
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

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities?.filter(activity => activity?.type === filter);

  const filterOptions = [
    { value: 'all', label: 'All Activity' },
    { value: 'donation', label: 'Donations' },
    { value: 'pickup', label: 'Pickups' },
    { value: 'request', label: 'Requests' },
    { value: 'match', label: 'Matches' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">Recent Activity</h2>
        <div className="flex gap-2">
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
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No recent activity found</p>
          </div>
        ) : (
          filteredActivities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-4 p-4 hover:bg-muted rounded-lg transition-smooth">
              <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                <Icon name={getActivityIcon(activity?.type)} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary mb-1">
                  {activity?.title}
                </p>
                <p className="text-sm text-text-secondary mb-2">
                  {activity?.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span>{formatTimeAgo(activity?.timestamp)}</span>
                  {activity?.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center">
                        <Icon name="MapPin" size={12} className="mr-1" />
                        {activity?.location}
                      </span>
                    </>
                  )}
                  {activity?.status && (
                    <>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity?.status === 'completed' ? 'bg-success/10 text-success' :
                        activity?.status === 'pending' ? 'bg-warning/10 text-warning' :
                        activity?.status === 'cancelled'? 'bg-destructive/10 text-destructive' : 'bg-muted text-text-secondary'
                      }`}>
                        {activity?.status}
                      </span>
                    </>
                  )}
                </div>
              </div>
              {activity?.actionable && (
                <Button variant="ghost" size="sm" iconName="ChevronRight" />
              )}
            </div>
          ))
        )}
      </div>
      {filteredActivities?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" fullWidth iconName="MoreHorizontal">
            View All Activity
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivityFeed;