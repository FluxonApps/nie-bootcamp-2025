import React from "react";

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold text-green-700">Admin Dashboard</h1>
      <p className="mt-4 text-gray-600">Manage donors and recipients here.</p>
    </div>
  );
};

export default AdminPage;
