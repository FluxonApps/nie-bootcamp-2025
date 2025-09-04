import React, { useState } from "react";
import api from "../api/axios";
import "./CreateGroupForm.css";

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
      await api.post("/groups", {
        name,
        description,
        domain,
        userId: user._id,
      });
      setName("");
      setDescription("");
      setDomain("");
      onGroupCreated();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error creating group");
    }
  };

  return (
    <form className="create-group-form" onSubmit={handleSubmit}>
      <h3>✨ Create a New Group</h3>

      <input
        type="text"
        placeholder="Group Name"
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
        rows={3}
      />

      <button type="submit">➕ Create Group</button>
    </form>
  );
};

export default CreateGroupForm;
