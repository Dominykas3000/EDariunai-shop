'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import router from "next/router";


const AdminControls = ({ sellerId }: { sellerId: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = useSession();

  console.log("admin session", session);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleFlagSeller = async () => {
    try{
      const response = await fetch(`/api/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sellerId })
      })

      if (response.ok) {
        toast('Seller flag status updated');
      } else {
        toast('Error flagging seller');
      }
    } catch (error) {
        console.error('Error flagging seller', error)
    }
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
              <button onClick={handleFlagSeller}>Change Flag Status</button>
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