"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {session ? (
          <h1 className="text-3xl">Authorized, {session.user?.name}!</h1>
        ) : (
          <h1 className="text-3xl">Not Authorized</h1>
        )}
        <h1 className="text-3xl">Tai tik gariunai internetu</h1>
        <span className="text-xs font-light">
          for legal reasons this is a joke
        </span>
      </div>
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
    </section>
  );
}
