import api from "./axios";

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Send a connection request
export const sendConnectionRequest = async (fromUser: string, toUser: string) => {
  const res = await api.post("/connections/request", { fromUser, toUser });
  return res.data;
};

// Accept a connection request
export const acceptConnectionRequest = async (connectionId: string) => {
  const res = await api.post("/connections/accept", { connectionId });
  return res.data;
};

// Reject a connection request
export const rejectConnectionRequest = async (connectionId: string) => {
  const res = await api.post("/connections/reject", { connectionId });
  return res.data;
};

// Get all accepted connections for a user
export const getConnections = async (userId: string) => {
  const res = await api.get(`/connections/${userId}`);
  return res.data;
};

// Get all pending requests for a user
export const getRequests = async (userId: string) => {
  const res = await api.get(`/connections/${userId}/requests`);
  return res.data;
};
