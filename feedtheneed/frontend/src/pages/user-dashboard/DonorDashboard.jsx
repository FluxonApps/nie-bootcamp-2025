import React, { useEffect, useState } from "react";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Replace this with actual logged-in donorId (from auth/localStorage)
  const donorId = "64f2cbd8d4f12345abcd6789";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info
        const userRes = await fetch(`http://localhost:5000/api/users/${donorId}`);
        const userData = await userRes.json();
        setUser(userData);

        // Fetch all donations then filter by donor
        const donationRes = await fetch("http://localhost:5000/api/donations");
        const allDonations = await donationRes.json();

        const donorDonations = allDonations.filter(
          (donation) => donation.donor === donorId || donation.donor?._id === donorId
        );

        setDonations(donorDonations);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [donorId]);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.name || "Donor"}
        </h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          Make a Donation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500">Total Quantity Donated</p>
          <p className="text-xl font-semibold text-gray-800">
            {donations.reduce((sum, d) => sum + d.quantity, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500">Donations Made</p>
          <p className="text-xl font-semibold text-gray-800">{donations.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500">Last Donation</p>
          <p className="text-xl font-semibold text-gray-800">
            {donations.length > 0
              ? new Date(donations[0].createdAt).toLocaleDateString()
              : "No donations yet"}
          </p>
        </div>
      </div>

      {/* Donation History */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Donation History</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2">Category</th>
              <th className="py-2">Description</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation) => (
                <tr key={donation._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{donation.category}</td>
                  <td className="py-2">{donation.description || "-"}</td>
                  <td className="py-2">{donation.quantity}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        donation.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </td>
                  <td className="py-2">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 text-center text-gray-500" colSpan="5">
                  No donations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorDashboard;
