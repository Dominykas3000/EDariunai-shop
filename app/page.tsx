import { connectToDatabase } from "@/utils/database";

export default function Home() {

  connectToDatabase();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-3xl">Tai tik gariunai internetu</h1>
        <span className="text-xs font-light">for legal reasons this is a joke</span>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

      </div>
    </main >
  );
}
