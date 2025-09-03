import React from "react";

const ActivityFeed = ({ activities = [] }) => {
  // activities will come from backend as props
  // Example shape: [{ id, user, action, timestamp, status }]

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No recent activity.
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id} className="p-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">
                    <strong>{activity.user}</strong> {activity.action}
                  </span>
                  <span className="text-xs text-gray-500">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
