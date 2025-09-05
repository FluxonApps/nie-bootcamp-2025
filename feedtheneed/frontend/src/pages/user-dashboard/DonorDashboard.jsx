import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState({ category: "", description: "", quantity: "" });
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message: string }
  const { user } = useAuth();

  const fetchDonations = async () => {
    try {
      const donationRes = await fetch("http://localhost:8002/api/donations", {
        headers: {
          Authorization: `Bearer ${user?.token || localStorage.getItem("token")}`,
        },
      });
      if (!donationRes.ok) throw new Error("Failed to fetch donations");
      const list = await donationRes.json();
      setDonations(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Error fetching donations:", err);
      setDonations([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        // Pull username from context
        const name = user?.username || "Donor";
        setProfile({ name });
        await fetchDonations();
      } finally {
        setLoading(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token]);

  const totals = useMemo(() => {
    const totalQuantity = donations.reduce((sum, d) => sum + (Number(d.quantity) || 0), 0);
    const donationsCount = donations.length;
    const sorted = [...donations].sort((a, b) => new Date(b.CreatedAt || b.createdAt || 0) - new Date(a.CreatedAt || a.createdAt || 0));
    const lastDonationDate = sorted[0]?.CreatedAt || sorted[0]?.createdAt || null;
    return { totalQuantity, donationsCount, lastDonationDate };
  }, [donations]);

  const statusBadge = (status) => {
    // Backend statuses: active, fulfilled, cancelled. Show "Pending" label for active.
    const normalized = (status || "").toLowerCase();
    if (normalized === "fulfilled") return "bg-green-100 text-green-700";
    if (normalized === "cancelled") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700"; // active => pending
  };

  const statusLabel = (status) => {
    const normalized = (status || "").toLowerCase();
    if (normalized === "fulfilled") return "Fulfilled";
    if (normalized === "cancelled") return "Cancelled";
    return "Pending"; // active
  };

  const submitDonation = async () => {
    try {
      const payload = {
        category: form.category.trim(),
        description: form.description.trim(),
        quantity: Number(form.quantity),
      };

      const res = await fetch("http://localhost:8002/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token || localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Unable to submit donation");
      }

      setAlert({ type: "success", message: "Donation submitted successfully. Pending approval." });
      setIsFormOpen(false);
      setForm({ category: "", description: "", quantity: "" });
      await fetchDonations();
    } catch (e) {
      setAlert({ type: "error", message: e.message || "Something went wrong" });
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Top Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_10%,rgba(59,130,246,0.15),transparent),radial-gradient(50%_50%_at_20%_0%,rgba(16,185,129,0.12),transparent)]" />
        <div className="relative px-6 pt-10 pb-6 sm:pt-12 sm:pb-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">Welcome, {profile?.name || "Donor"}</h1>
              <p className="mt-2 text-gray-600">Track your impact and create new donations with ease.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:shadow-lg hover:bg-blue-700 transition"
              >
                <span>＋</span>
                <span>Make a Donation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {alert && (
        <div
          className={`mb-6 rounded-lg border p-4 ${
            alert.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">{alert.type === "success" ? "Success" : "Error"}</p>
              <p className="text-sm mt-1">{alert.message}</p>
            </div>
            <button onClick={() => setAlert(null)} className="text-sm opacity-70 hover:opacity-100">Dismiss</button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 -mt-6 sm:-mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Total Quantity Donated</p>
              <span className="text-blue-600">📦</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{totals.totalQuantity}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Donations Made</p>
              <span className="text-emerald-600">🎁</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{totals.donationsCount}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Last Donation</p>
              <span className="text-amber-600">⏱️</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{totals.lastDonationDate ? new Date(totals.lastDonationDate).toLocaleDateString() : "No donations yet"}</p>
          </div>
        </div>
      </div>

      {/* Donation History */}
      <div className="max-w-7xl mx-auto px-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Donation History</h2>
        <div className="overflow-hidden rounded-xl border border-gray-100">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr className="text-gray-600">
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              [...donations]
                .sort((a, b) => new Date(b.CreatedAt || b.createdAt || 0) - new Date(a.CreatedAt || a.createdAt || 0))
                .map((donation) => (
                <tr key={donation._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{donation.category}</td>
                  <td className="py-3 px-4">{donation.description || "-"}</td>
                  <td className="py-3 px-4">{donation.quantity}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-sm ${statusBadge(donation.status)}`}
                    >
                      {statusLabel(donation.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {new Date(donation.CreatedAt || donation.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-8 text-center text-gray-500" colSpan="5">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-3xl">🗂️</div>
                    <p className="font-medium text-gray-700">No donations found</p>
                    <p className="text-sm text-gray-500">Click "Make a Donation" to create your first one.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
      </div>

      {/* Donation Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900">New Donation</h3>
              <button onClick={() => setIsFormOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Food">Food</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Hygiene">Hygiene</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={3}
                  placeholder="Describe the donation (optional)"
                  className="mt-1 w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsFormOpen(false)} className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50">Cancel</button>
              <button
                onClick={submitDonation}
                disabled={!form.category || !form.quantity}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 disabled:opacity-50"
              >
                Submit Donation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
