import React, { useEffect, useState } from "react";
import api from "../api/axios";
import CreateGroupForm from "../components/CreateGroupForm";

interface Group {
  _id: string;
  name: string;
  description: string;
  domain: string;
  members: { user: { name: string; username: string }; role: string }[];
}

export default function Groups() {
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [allGroups, setAllGroups] = useState<Group[]>([]);
  const [tab, setTab] = useState<"my" | "all">("my");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchMyGroups = async () => {
    if (!user._id) return;
    const res = await api.get(`/groups/user/${user._id}`);
    setMyGroups(res.data);
  };

  const fetchAllGroups = async () => {
    const res = await api.get("/groups");
    setAllGroups(res.data);
  };

  useEffect(() => {
    fetchMyGroups();
    fetchAllGroups();
  }, []);

  const handleJoin = async (groupId: string) => {
    await api.post(`/groups/${groupId}/members`, { userId: user._id });
    fetchMyGroups();
    fetchAllGroups();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Groups</h1>
      <CreateGroupForm onGroupCreated={() => { fetchMyGroups(); fetchAllGroups(); }} />

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setTab("my")}>My Groups</button>
        <button onClick={() => setTab("all")}>All Groups</button>
      </div>

      {tab === "my" && (
        <>
          <h2>My Groups</h2>
          {myGroups.map((g) => (
            <div key={g._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h3>{g.name}</h3>
              <p>{g.description}</p>
              <p>Members: {g.members.length}</p>
            </div>
          ))}
        </>
      )}

      {tab === "all" && (
        <>
          <h2>All Groups</h2>
          {allGroups.map((g) => (
            <div key={g._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
              <h3>{g.name}</h3>
              <p>{g.description}</p>
              <p>Members: {g.members.length}</p>
              <button onClick={() => handleJoin(g._id)}>Join</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
