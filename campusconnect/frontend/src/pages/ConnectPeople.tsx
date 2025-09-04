import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, sendConnectionRequest } from "../api/connections"; // add these in api/connections.ts
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        // filter out the logged-in user so you don’t send request to yourself
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
      <div style={{ padding: "2rem", minHeight: "70vh" }}>
        <h1>🤝 Connect with People</h1>
        <p>Discover and connect with your peers easily.</p>

        {/* Quick Nav Buttons */}
        <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          <button onClick={handleGoToConnections} style={{ marginRight: "1rem" }}>
            View My Connections
          </button>
          <button onClick={handleGoToRequests}>View Pending Requests</button>
        </div>

        {/* User List */}
        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user._id} style={{ marginBottom: "1rem" }}>
                <strong>{user.name}</strong> ({user.username}) - {user.email}
                <button
                  style={{ marginLeft: "1rem" }}
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
