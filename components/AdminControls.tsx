'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";


const AdminControls = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  console.log(session);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };


  let adminDropDown = (
    <div className="relative inline-block text-left">
      <button
        onClick={handleToggle}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
      >
        Admin Controls
        {isOpen && (
          <ul className="border absolute right-0 mt-2 w-56 rounded-md shadow-sm bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 top-[35px]">

            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <a href="/admin/seller/create">Create Seller</a>
            </li>

            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <a href="/admin/seller">View Sellers</a>
            </li>

            <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <a href="/admin/seller/review">Create Review</a>
            </li>

          </ul>
        )}
      </button>
    </div>
  );

  //@ts-ignore
  if (session && session.user?.privileges === 'admin')
    return adminDropDown;
  else
    return null;

};

export default AdminControls;