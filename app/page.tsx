"use client";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Link from "next/link";
import { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ProductList from '@/components/ProductList';
export default function Home() {

  const [providers, setProviders] = useState<any | null>(null);
  const { data: session } = useSession();

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
            <button className="w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800">View all items</button>
          </Link>
        </div>


        {/* <ProductList /> */}
      </div>
    </section >
  );
}
