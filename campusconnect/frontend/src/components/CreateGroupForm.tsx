import { useState } from "react";

export default function CreateGroupForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");
  const [type, setType] = useState<"public" | "private">("public");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8001/api/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          domain,
          type,
          members: [], // start empty
        }),
      });
      const data = await res.json();
      console.log("Group created:", data);
      alert("Group created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create group");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value as "public" | "private")}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
}
