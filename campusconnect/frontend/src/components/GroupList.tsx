import { useEffect, useState } from "react";

interface Member {
  user: string;
  role: "admin" | "member";
}

interface Group {
  _id: string;
  name: string;
  description: string;
  domain: string;
  type: "public" | "private";
  members: Member[];
}

export default function GroupList() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    fetch("http://localhost:8002/api/groups")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error("Error fetching groups:", err));
  }, []);

  return (
    <div>
      <h2>Groups</h2>
      <ul>
        {groups.map((g) => (
          <li key={g._id}>
            <strong>{g.name}</strong> ({g.type}) - {g.domain}
            <p>{g.description}</p>
            <small>Members: {g.members.length}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
