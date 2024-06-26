import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/context/CartContext";

import { Toaster } from "@/components/ui/sonner";

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
    <CartProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <SessionProvider session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main className="flex min-h-[90dvh] flex-col items-center justify-between py-24 lg:px-16 md:px-10 sm:px-6 dark:bg-gray-900">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </SessionProvider>
          <Toaster />
        </body>
      </html>
    </CartProvider>
  );
}
