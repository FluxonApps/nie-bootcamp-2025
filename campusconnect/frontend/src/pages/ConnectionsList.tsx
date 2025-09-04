// import React, { useEffect, useState } from "react";
// import { getConnections } from "../api/connections";

// interface User {
//   _id: string;
//   name: string;
//   username: string;
//   email: string;
// }

// const ConnectionsList: React.FC<{ userId: string }> = ({ userId }) => {
//   const [connections, setConnections] = useState<User[]>([]);

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
//     <div>
//       <h2>My Connections</h2>
//       {connections.length === 0 ? (
//         <p>No connections yet.</p>
//       ) : (
//         <ul>
//           {connections.map((user) => (
//             <li key={user._id}>
//               <strong>{user.name}</strong> ({user.username}) - {user.email}
              
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ConnectionsList;


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
