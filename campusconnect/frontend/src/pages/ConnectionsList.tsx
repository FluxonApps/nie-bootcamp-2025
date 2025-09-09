import React, { useEffect, useState } from "react";
import { getConnections } from "../api/connections";
import "./ConnectionsList.css";
import { MessageCircle } from "lucide-react";

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
}

interface Connection {
  _id: string;
  fromUser: User;
  toUser: User;
  status: string;
}

const ConnectionsList: React.FC<{ userId: string }> = ({ userId }) => {
  const [connections, setConnections] = useState<Connection[]>([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await getConnections(userId);
        setConnections(data);
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    };

    fetchConnections();
  }, [userId]);

  const handleMessage = (userId: string) => {
    alert(`Opening chat with user ID: ${userId}`);
    // Future enhancement: navigate(`/chat/${userId}`);
  };

  return (
    <div className="connections-container">
      <h2 className="connections-title">My Connections</h2>

      {connections.length === 0 ? (
        <p className="no-connections">No connections yet.</p>
      ) : (
        <ul className="connections-list">
          {connections.map((conn) => {
            const connectedUser =
              conn.fromUser._id === userId ? conn.toUser : conn.fromUser;

            return (
              <li key={conn._id} className="connection-card">
                {/* Avatar */}
                <div className="avatar">
                  {connectedUser.name.charAt(0).toUpperCase()}
                </div>

                {/* User Details */}
                <div className="user-info">
                  <span className="user-name">{connectedUser.name}</span>
                  <span className="user-username">@{connectedUser.username}</span>
                  <span className="user-email">{connectedUser.email}</span>
                </div>

                {/* Small Message Button */}
                <button
                  className="message-btn"
                  onClick={() => handleMessage(connectedUser._id)}
                >
                  <MessageCircle size={14} />
                  Message
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ConnectionsList;
