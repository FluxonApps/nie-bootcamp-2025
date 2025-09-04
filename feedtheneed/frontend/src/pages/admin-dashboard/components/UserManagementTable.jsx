import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";

const UserManagementTable = ({ users = [], refreshUsers }) => {   // ⬅️ default safe
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Approve user
  const handleApprove = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}/approve`, { method: "PATCH" });
      refreshUsers();
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  // Reject user
  const handleReject = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}/reject`, { method: "PATCH" });
      refreshUsers();
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  const roleOptions = [
    { value: "all", label: "All Roles" },
    { value: "donor", label: "Donors" },
    { value: "recipient", label: "Recipients" },
  ];

  // Filtering
  const filteredUsers = users.filter((user) => {
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user._id));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      inactive: { color: "bg-gray-200 text-gray-800", label: "Inactive" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
    };
    const config = statusConfig[status] || statusConfig.inactive;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      donor: { color: "bg-blue-100 text-blue-800", label: "Donor" },
      recipient: { color: "bg-purple-100 text-purple-800", label: "Recipient" },
      admin: { color: "bg-red-100 text-red-800", label: "Admin" },
    };
    const config = roleConfig[role] || roleConfig.donor;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>;
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="search"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64"
            />
            <div className="flex gap-2">
              <Select options={roleOptions} value={filterRole} onChange={setFilterRole} className="w-40" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-t border-border hover:bg-gray-50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleSelectUser(user._id)}
                    />
                  </td>
                  <td className="p-4">{user.name}</td>
                  <td className="p-4 space-x-2">
                    <Button variant="success" size="sm" onClick={() => handleApprove(user._id)}>Accept</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleReject(user._id)}>Reject</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
