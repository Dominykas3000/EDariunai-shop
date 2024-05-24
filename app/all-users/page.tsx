"use client";

import { useEffect, useState } from "react";
import { NextResponse } from "next/server";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface User {
  _id: string;
  username: string;
  email: string;
  frozen: boolean;
}

const AllUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/all-users");
      const data = await response.json();
      setUsers(data.users);
    };

    fetchUsers();
  }, []);

  const handleFreezeAccount = async (userId: string) => {
    console.log("userId", userId);
    try {
      const response = await fetch(`/api/freeze-account`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          data: userId,
        },
      });

      if (response.ok) {
        const updatedUsers = users.map((user) => {
          if (user._id === userId) {
            user.frozen = !user.frozen;
          }
          return user;
        });
        setUsers(updatedUsers);
        toast("Account frozen/unfrozen successfully");
      } else {
        toast("Failed to freeze account");
      }
    } catch (error) {
      console.error("Failed to freeze account", error);
    }
  };

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      {users.length > 0 && (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Name</th>
              <th className="border border-gray-400 px-4 py-2">Email</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-400 px-4 py-2">
                  {user.username}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  <button
                    className={`px-3 py-1 rounded hover:bg-red-600 ${
                      user.frozen ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                    onClick={() => handleFreezeAccount(user._id)}
                  >
                    {user.frozen ? "Unfreeze Account" : "Freeze Account"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AllUsersPage;
