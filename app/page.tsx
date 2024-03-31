"use client";
import { connectToDatabase } from "@/app/utils/database";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Link from "next/link";
import { useEffect, useState } from 'react'


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

  //connectToDatabase();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24 lg:px-24 md:px-10 sm:px-6">

      <div className="flex flex-col items-center justify-center w-full h-full">
        {session ? <h1 className="text-3xl">Authorized, {session.user?.name}!</h1> : <h1 className="text-3xl">Not Authorized</h1>}
        <h1 className="text-3xl">Tai tik gariunai internetu</h1>
        <span className="text-xs font-light">for legal reasons this is a joke</span>

      </div>
<div>
      {session?.user ?
        (
          <div className='flex gap-3 md:gap-5'>
            
            <button type='button' onClick={() => signOut()} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>

            </Link>
          </div>
        ) : (
          <>
            {
              providers &&
              Object.values(providers).map((provider: any) => (
                <button type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'>
                  Sign in
                </button>
              ))
            }
          </>
        )}
    </div>


      

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

      </div>
    </main >
  );
}
