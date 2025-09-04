import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingSchedule = ({ user, scheduleItems }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(tomorrow?.getDate() + 1);

    if (date?.toDateString() === today?.toDateString()) {
      return `Today, ${date?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } else if (date?.toDateString() === tomorrow?.toDateString()) {
      return `Tomorrow, ${date?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } else {
      return date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
    }
  };

  const getStatusColor = (status) => {
    const colorMap = {
      confirmed: 'bg-success/10 text-success border-success/20',
      pending: 'bg-warning/10 text-warning border-warning/20',
      cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
      completed: 'bg-muted text-text-secondary border-border'
    };
    return colorMap?.[status] || 'bg-muted text-text-secondary border-border';
  };

  const getTypeIcon = (type) => {
    const iconMap = {
      pickup: 'Truck',
      delivery: 'Package',
      meeting: 'Users',
      reminder: 'Bell'
    };
    return iconMap?.[type] || 'Calendar';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">
          {user?.role === 'donor' ? 'Upcoming Pickups' : 'Upcoming Deliveries'}
        </h2>
        <Button variant="ghost" size="sm" iconName="Calendar">
          View Calendar
        </Button>
      </div>
      <div className="space-y-4">
        {scheduleItems?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary mb-2">No upcoming schedule</p>
            <p className="text-sm text-text-secondary">
              {user?.role === 'donor' 
                ? 'Your pickup appointments will appear here' :'Your delivery schedule will appear here'}
            </p>
          </div>
        ) : (
          scheduleItems?.map((item) => (
            <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getTypeIcon(item?.type)} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{item?.title}</h3>
                    <p className="text-sm text-text-secondary">{formatDate(item?.datetime)}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item?.status)}`}>
                  {item?.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {item?.location && (
                  <div className="flex items-center text-sm text-text-secondary">
                    <Icon name="MapPin" size={16} className="mr-2" />
                    {item?.location}
                  </div>
                )}
                {item?.contact && (
                  <div className="flex items-center text-sm text-text-secondary">
                    <Icon name="User" size={16} className="mr-2" />
                    {item?.contact}
                  </div>
                )}
                {item?.items && (
                  <div className="flex items-center text-sm text-text-secondary">
                    <Icon name="Package" size={16} className="mr-2" />
                    {item?.items} items
                  </div>
                )}
              </div>

              {item?.notes && (
                <div className="bg-muted rounded-lg p-3 mb-4">
                  <p className="text-sm text-text-secondary">{item?.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {item?.status === 'pending' && (
                    <>
                      <Button variant="outline" size="sm" iconName="Check">
                        Confirm
                      </Button>
                      <Button variant="ghost" size="sm" iconName="X">
                        Cancel
                      </Button>
                    </>
                  )}
                  {item?.status === 'confirmed' && (
                    <>
                      <Button variant="outline" size="sm" iconName="MessageCircle">
                        Contact
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Edit">
                        Reschedule
                      </Button>
                    </>
                  )}
                </div>
                <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
              </div>
            </div>
          ))
        )}
      </div>
      {scheduleItems?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <Button variant="ghost" fullWidth iconName="Plus">
            Schedule New {user?.role === 'donor' ? 'Pickup' : 'Delivery'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingSchedule;