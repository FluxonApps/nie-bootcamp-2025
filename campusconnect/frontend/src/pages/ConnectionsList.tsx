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
            // Determine the connected user (not the current user)
            const connectedUser =
              conn.fromUser._id === userId ? conn.toUser : conn.fromUser;

            return (
              <li key={conn._id}>
                <strong>{connectedUser.name}</strong> ({connectedUser.username}) - {connectedUser.email}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ConnectionsList;

// import React, { useEffect, useState } from "react";
// import { getConnections } from "../api/connections";
// import "./ConnectionsList.css";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// interface User {
//   _id: string;
//   name: string;
//   username: string;
//   email: string;
//   avatar?: string; // optional avatar URL
// }

// const ConnectionsList: React.FC<{ userId: string }> = ({ userId }) => {
//   const [connections, setConnections] = useState<User[]>([]);
//   const [heading, setHeading] = useState("My Connections");

//   useEffect(() => {
//     // Dynamic heading based on time of day
//     const hours = new Date().getHours();
//     if (hours < 12) setHeading("☀️ Morning Connections");
//     else if (hours < 18) setHeading("🌞 Afternoon Connections");
//     else setHeading("🌙 Evening Connections");
//   }, []);

//   useEffect(() => {
//     const fetchConnections = async () => {
//       try {
//         const data = await getConnections(userId);
//         setConnections(data);
//       } catch (err) {
//         console.error("Error fetching connections:", err);
//       }
//     };

//     fetchConnections();
//   }, [userId]);

//   return (
//     <>
//       <Header />
//       <div className="connections-container">
//         <h2>{heading}</h2>
//         {connections.length === 0 ? (
//           <p className="no-connections">No connections yet.</p>
//         ) : (
//           <ul className="connections-list">
//             {connections.map((user) => (
//               <li key={user._id} className="connection-item theme-card">
//                 <div className="connection-avatar">
//                   {user.avatar ? (
//                     <img src={user.avatar} alt={user.name} />
//                   ) : (
//                     <span>{user.name.charAt(0).toUpperCase()}</span>
//                   )}
//                 </div>
//                 <div className="connection-details">
//                   <strong>{user.name}</strong>{" "}
//                   <span className="username">({user.username})</span>
//                   <div className="connection-email">{user.email}</div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default ConnectionsList;
