import React, { useEffect, useState } from "react";
import { getRequests, acceptConnectionRequest, rejectConnectionRequest } from "../api/connections";

interface Request {
  _id: string;
  fromUser: { _id: string; name: string; username: string };
}

const RequestsList: React.FC<{ userId: string }> = ({ userId }) => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = await getRequests(userId);
      setRequests(data);
    };
    fetchRequests();
  }, [userId]);

  const handleAccept = async (id: string) => {
    await acceptConnectionRequest(id);
    setRequests(requests.filter(r => r._id !== id));
  };

  const handleReject = async (id: string) => {
    await rejectConnectionRequest(id);
    setRequests(requests.filter(r => r._id !== id));
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map(req => (
          <div key={req._id}>
            <span>{req.fromUser.name} ({req.fromUser.username})</span>
            <button onClick={() => handleAccept(req._id)}>Accept</button>
            <button onClick={() => handleReject(req._id)}>Reject</button>
          </div>
        ))
      )}
    </div>
  );
};

export default RequestsList;
