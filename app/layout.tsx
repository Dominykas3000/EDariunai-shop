import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

import { getServerSession } from "next-auth";
import SessionProvider from "@utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edariunai",
  description: "E shop for all your needs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          <main className="flex min-h-[90dvh] flex-col items-center justify-between py-24 lg:px-24 md:px-10 sm:px-6">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
