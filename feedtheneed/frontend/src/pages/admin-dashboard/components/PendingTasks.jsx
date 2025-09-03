import React from "react";

const PendingTasks = ({ tasks = [], onComplete }) => {
  const getTimeUntilDue = (dueDate) => {
    const now = new Date();
    const diff = new Date(dueDate) - now;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (diff < 0) return "Overdue";
    if (days > 0) return `${days}d remaining`;
    if (hours > 0) return `${hours}h remaining`;
    return "Due soon";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Pending Tasks</h2>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            All tasks completed 🎉
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {getTimeUntilDue(task.dueDate)}
                  </p>
                </div>
                {onComplete && (
                  <button
                    onClick={() => onComplete(task.id)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Complete
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PendingTasks;
