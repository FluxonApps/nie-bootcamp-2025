import React, { useEffect, useState } from "react";
import api from "../api/axios";

interface Group {
  _id: string;
  name: string;
  description: string;
  domain: string;
  members: { user: { name: string; username: string }; role: string }[];
}

export default function GroupList() {
  const [groups, setGroups] = useState<Group[]>([]);

  const fetchGroups = async () => {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);
    } catch (err) {
      console.error("Error fetching groups:", err);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleJoin = async (groupId: string) => {
    try {
      await api.post(`/groups/${groupId}/members`); // backend takes req.user
      fetchGroups(); // refresh list
    } catch (err) {
      console.error("Error joining group:", err);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Available Groups</h2>
      {groups.map((group) => (
        <div key={group._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h3>{group.name}</h3>
          <p>{group.description}</p>
          <p>Domain: {group.domain}</p>
          <p>Members: {group.members.length}</p>
          <button onClick={() => handleJoin(group._id)}>Join Group</button>
        </div>
      ))}
    </div>
  );
}
