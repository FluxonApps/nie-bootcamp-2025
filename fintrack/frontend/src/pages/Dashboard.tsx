import { useEffect, useState, type JSX } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  college: string;
  budget: number;
}

function Dashboard(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get<User[]>("http://localhost:4000/api/users");
        setUsers(res.data);
      } catch (err: any) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-green-100">
        <h1 className="text-xl font-semibold">Loading users...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6 bg-green-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Users 🎉</h1>
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        {users.length === 0 ? (
          <p className="text-gray-600">No users found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {users.map((user) => (
              <li key={user._id} className="py-3">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.college}</p>
                <p className="text-sm text-gray-800">Budget: ₹{user.budget}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
