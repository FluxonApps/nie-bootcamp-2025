import React, { useEffect, useState } from "react";
import { getConnections } from "../api/connections";

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

  return (
    <div>
      <h2>My Connections</h2>
      {connections.length === 0 ? (
        <p>No connections yet.</p>
      ) : (
        <ul>
          {connections.map((conn) => {
            const otherUser =
              conn.fromUser._id === userId ? conn.toUser : conn.fromUser;
            return (
              <li key={conn._id}>
                <strong>{otherUser?.name}</strong> ({otherUser?.username}) –{" "}
                {otherUser?.email}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ConnectionsList;
