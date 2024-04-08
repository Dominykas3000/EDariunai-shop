"use client";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import Link from "next/link";
import { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
export default function Home() {

  const [providers, setProviders] = useState<any | null>(null);
  const { data: session } = useSession();
  console.log(session)

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
              <h1 className="text-3xl">Authorized, {session.user?.name}!
              </h1>
              <Avatar className='w-[150px] h-[150px]'>
                <AvatarImage src={session.user?.image || ""} />

              </Avatar>
            </div>
            : <h1 className="text-3xl">Not Authorized</h1>
        }
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
    </section >
  );
}
