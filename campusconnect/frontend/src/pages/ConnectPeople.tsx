
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, sendConnectionRequest } from "../api/connections";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./ConnectPeople.css";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
}

const ConnectPeople: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.filter((u: User) => u._id !== currentUserId));
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentUserId]);

  const handleConnect = async (toUserId: string) => {
    try {
      if (!currentUserId) {
        alert("Please login first!");
        return;
      }
      await sendConnectionRequest(currentUserId, toUserId);
      alert("Connection request sent!");
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send connection request");
    }
  };

  const handleGoToConnections = () => navigate("/connections");
  const handleGoToRequests = () => navigate("/requests");

  return (
    <>
      <Header />
      <div className="connect-container">
        <h1 className="connect-title">🌐 Find Your Tribe</h1>
        <p className="connect-tagline">
          "Expand your circle, build meaningful bonds, and grow together 🚀"
        </p>

        {/* Quick Nav Buttons */}
        <div className="connect-nav">
          <button onClick={handleGoToConnections}>View My Connections</button>
          <button onClick={handleGoToRequests}>View Pending Requests</button>
        </div>

        {/* User List */}
        {loading ? (
          <p className="loading-text">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="empty-text">No users found. Be the first to connect!</p>
        ) : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user._id} className="user-item">

                <div className="user-left">
                  <div className="user-avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <strong>{user.name}</strong>
                    <span>@{user.username || "unknown"}</span>
                    <div className="user-email">{user.email}</div>
                  </div>

                </div>
                <button
                  className="connect-btn"
                  onClick={() => handleConnect(user._id)}
                >
                  Connect
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ConnectPeople;