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
        <ProductList />
      </div>
    </section >
  );
}
