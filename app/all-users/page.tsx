"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";

interface User {
  _id: string;
  username: string;
  email: string;
  frozen: boolean;
}

const spinner = (<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25" /><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>);

const USERS_PER_PAGE = 8;

const AllUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await fetch("/api/all-users");
      const data = await response.json();
      setUsers(data.users);
      setLoading(false);
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const currentUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader">{spinner}</div> 
        </div>
      ) : (
        currentUsers.length > 0 && (
          <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Name</th>
                  <th className="border border-gray-400 px-4 py-2">Email</th>
                  <th className="border border-gray-400 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="border border-gray-400 px-4 py-2">{user.username}</td>
                    <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      <button
                        className={`px-3 py-1 rounded hover:bg-red-600 ${user.frozen ? "bg-green-500" : "bg-red-500"
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
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 mx-1 bg-gray-300 rounded"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-4 py-2 mx-1 rounded ${i + 1 === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
                    }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-4 py-2 mx-1 bg-gray-300 rounded"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )
      )}
    </section>
  );
};

export default AllUsersPage;
