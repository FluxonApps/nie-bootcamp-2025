import React, { useState } from "react";
import api from "../api/axios";

interface Props {
  onGroupCreated: () => void;
}

const CreateGroupForm: React.FC<Props> = ({ onGroupCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [domain, setDomain] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log("Submitting group:", {
  name,
  description,
  domain,
  userId: user._id || user.userId,
});

      await api.post("/groups", {
        name,
        description,
        domain,
        userId: user._id, // pass creator id
      });
      setName("");
      setDescription("");
      setDomain("");
      onGroupCreated(); // refresh list
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating group");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Create Group</h3>
      <input
        type="text"
        placeholder="Group name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateGroupForm;
