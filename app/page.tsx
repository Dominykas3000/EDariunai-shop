"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getProviders, useSession } from 'next-auth/react';
import Link from "next/link";
import { useEffect, useState } from 'react';
export default function Home() {

  const [providers, setProviders] = useState<any | null>(null);
  const { data: session } = useSession();
  const isAdmin = session?.user?.privileges == "admin";

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders();

  }, [])

  return (
    <section className="">

      <div className="flex flex-col items-center justify-center w-full h-full">
        {
          session ?
            <div className='flex flex-col justify-center items-center gap-8'>
              <h1 className="text-3xl">Welcome, {session.user?.name}!
              </h1>
              <Avatar className='w-[150px] h-[150px]'>
                <AvatarImage src={session.user?.image || ""} />

              </Avatar>
            </div>
            : <h1 className="text-3xl">Please log in to access all features</h1>
        }

        <div className="flex mt-40">
          <Link href="/all-items-page">
            <button className="w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center  dark:hover:bg-gray-800 dark:focus:ring-gray-800 dark:bg-gray-800">View all items!</button>
          </Link>
        </div>


        {
          session?.user?.id ? (
            <div className="flex gap-4 mt-4">
              <Link
                href={`/wishlist/${encodeURIComponent(session.user.id)}`}>
                <button className="w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800">View Your Wishlist! </button>
              </Link>
            </div>
          ) : ' '
        }

        <div className="flex mt-4">
          <Link href="/popularItems">
            <button className="w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
              View popular items!
            </button>
          </Link>
        </div>

        {isAdmin ? (
          <div className="flex mt-4">
            <Link href="/all-users">
              <button className="w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
                View all users!
              </button>
            </Link>
          </div>
        ) : null}
        {/* <ProductList /> */}
      </div>
    </section >
  );
}
