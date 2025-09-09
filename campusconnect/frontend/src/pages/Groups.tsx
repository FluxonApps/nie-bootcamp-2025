// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import CreateGroupForm from "../components/CreateGroupForm";

// interface Group {
//   _id: string;
//   name: string;
//   description: string;
//   domain: string;
//   members: { user: { name: string; username: string }; role: string }[];
// }

// export default function Groups() {
//   const [myGroups, setMyGroups] = useState<Group[]>([]);
//   const [allGroups, setAllGroups] = useState<Group[]>([]);
//   const [tab, setTab] = useState<"my" | "all">("my");

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const fetchMyGroups = async () => {
//     if (!user._id) return;
//     const res = await api.get(`/groups/user/${user._id}`);
//     setMyGroups(res.data);
//   };

//   const fetchAllGroups = async () => {
//     const res = await api.get("/groups");
//     setAllGroups(res.data);
//   };

//   useEffect(() => {
//     fetchMyGroups();
//     fetchAllGroups();
//   }, []);

//   const handleJoin = async (groupId: string) => {
//     await api.post(`/groups/${groupId}/members`, { userId: user._id });
//     fetchMyGroups();
//     fetchAllGroups();
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Groups</h1>
//       <CreateGroupForm onGroupCreated={() => { fetchMyGroups(); fetchAllGroups(); }} />

//       <div style={{ marginBottom: "20px" }}>
//         <button onClick={() => setTab("my")}>My Groups</button>
//         <button onClick={() => setTab("all")}>All Groups</button>
//       </div>

//       {tab === "my" && (
//         <>
//           <h2>My Groups</h2>
//           {myGroups.map((g) => (
//             <div key={g._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
//               <h3>{g.name}</h3>
//               <p>{g.description}</p>
//               <p>Members: {g.members.length}</p>
//             </div>
//           ))}
//         </>
//       )}

//       {tab === "all" && (
//         <>
//           <h2>All Groups</h2>
//           {allGroups.map((g) => (
//             <div key={g._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
//               <h3>{g.name}</h3>
//               <p>{g.description}</p>
//               <p>Members: {g.members.length}</p>
//               <button onClick={() => handleJoin(g._id)}>Join</button>
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import api from "../api/axios";
// import CreateGroupForm from "../components/CreateGroupForm";
// import "./Groups.css";

// interface Group {
//   _id: string;
//   name: string;
//   description: string;
//   domain: string;
//   members: { user: { name: string; username: string }; role: string }[];
// }

// export default function Groups() {
//   const [myGroups, setMyGroups] = useState<Group[]>([]);
//   const [allGroups, setAllGroups] = useState<Group[]>([]);
//   const [tab, setTab] = useState<"my" | "all">("my");

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const fetchMyGroups = async () => {
//     if (!user._id) return;
//     const res = await api.get(`/groups/user/${user._id}`);
//     setMyGroups(res.data);
//   };

//   const fetchAllGroups = async () => {
//     const res = await api.get("/groups");
//     setAllGroups(res.data);
//   };

//   useEffect(() => {
//     fetchMyGroups();
//     fetchAllGroups();
//   }, []);

//   const handleJoin = async (groupId: string) => {
//     await api.post(`/groups/${groupId}/members`, { userId: user._id });
//     fetchMyGroups();
//     fetchAllGroups();
//   };

//   const renderGroupCard = (g: Group, showJoin = false) => (
//     <div key={g._id} className="group-card">
//       <div className="card-inner">
//         {/* Front side */}
//         <div className="card-front">
//           <h3>{g.name}</h3>
//         </div>
//         {/* Back side */}
//         <div className="card-back">
//           <p><strong>Description:</strong> {g.description || "No description"}</p>
//           <p><strong>Domain:</strong> {g.domain}</p>
//           <p><strong>Members:</strong> {g.members.length}</p>
//           {showJoin && (
//             <button onClick={() => handleJoin(g._id)}>➕ Join</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="groups-container">
//       <h1>👥 Groups</h1>

//       <CreateGroupForm
//         onGroupCreated={() => {
//           fetchMyGroups();
//           fetchAllGroups();
//         }}
//       />

//       {/* Tabs */}
//       <div className="tabs">
//         <button
//           onClick={() => setTab("my")}
//           className={tab === "my" ? "active" : ""}
//         >
//           ⭐ My Groups
//         </button>
//         <button
//           onClick={() => setTab("all")}
//           className={tab === "all" ? "active" : ""}
//         >
//           🌍 All Groups
//         </button>
//       </div>

//       {/* Group Listings */}
//       <div className="group-grid">
//         {tab === "my" &&
//           (myGroups.length === 0 ? (
//             <p>You haven't joined any groups yet 🚀</p>
//           ) : (
//             myGroups.map((g) => renderGroupCard(g))
//           ))}

//         {tab === "all" &&
//           (allGroups.length === 0 ? (
//             <p>No groups available 😢</p>
//           ) : (
//             allGroups.map((g) => renderGroupCard(g, true))
//           ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import api from "../api/axios";
import CreateGroupForm from "../components/CreateGroupForm";
import "./Groups.css";

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

  const renderGroupCard = (g: Group, showJoin = false) => (
    <div key={g._id} className="group-card">
      <div className="card-inner">
        {/* Front side */}
        <div className="card-front">
          <h3>{g.name}</h3>
          <p>{g.domain}</p>
        </div>

        {/* Back side */}
        <div className="card-back">
          <p><strong>Description:</strong> {g.description || "No description"}</p>
          <p><strong>Members:</strong> {g.members.length}</p>
          {showJoin && (
            <button className="join-btn" onClick={() => handleJoin(g._id)}>➕ Join</button>


          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="groups-container">
      <h1>👥 Groups</h1>

      <CreateGroupForm
        onGroupCreated={() => {
          fetchMyGroups();
          fetchAllGroups();
        }}
      />

      {/* Tabs */}
      <div className="tabs">
        <button
          onClick={() => setTab("my")}
          className={tab === "my" ? "active" : ""}
        >
          ⭐ My Groups
        </button>
        <button
          onClick={() => setTab("all")}
          className={tab === "all" ? "active" : ""}
        >
          🌍 All Groups
        </button>
      </div>

      {/* Group Listings */}
      <div className="group-grid">
        {tab === "my" &&
          (myGroups.length === 0 ? (

            <p className="empty-msg">You haven’t joined any groups yet 🚀</p>

          ) : (
            myGroups.map((g) => renderGroupCard(g))
          ))}

        {tab === "all" &&
          (allGroups.length === 0 ? (

            <p className="empty-msg">No groups available 😢</p>

          ) : (
            allGroups.map((g) => renderGroupCard(g, true))
          ))}
      </div>
    </div>
  );

  return (
    <div className="groups-container">
      <h1>👥 Groups</h1>

      <CreateGroupForm
        onGroupCreated={() => {
          fetchMyGroups();
          fetchAllGroups();
        }}
      />

      {/* Tabs */}
      <div className="tabs">
        <button
          onClick={() => setTab("my")}
          className={tab === "my" ? "active" : ""}
        >
          ⭐ My Groups
        </button>
        <button
          onClick={() => setTab("all")}
          className={tab === "all" ? "active" : ""}
        >
          🌍 All Groups
        </button>
      </div>

      {/* Group Listings */}
      <div className="group-grid">
        {tab === "my" &&
          (myGroups.length === 0 ? (
            <p className="empty-msg">You haven’t joined any groups yet 🚀</p>
          ) : (
            myGroups.map((g) => renderGroupCard(g))
          ))}

        {tab === "all" &&
          (allGroups.length === 0 ? (
            <p className="empty-msg">No groups available 😢</p>
          ) : (
            allGroups.map((g) => renderGroupCard(g, true))
          ))}
      </div>
    </div>
  );
}