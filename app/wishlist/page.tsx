"use client";


import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  stock: number;
  image?: string;
  category: string;
  sellerId: Seller;
  salePrice?: number;
}

interface Seller {
  _id: string;
  creator: string;
  description: string;
  name: string;
}

const WishlistPage = () => {

  const [wishlisted, setWishlisted] = useState<Product[]>([]);

  const { data: session } = useSession();

  const fetchWishlisted = async () => {
    if (!session) return;

    try {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "data": JSON.stringify({
            userId: session.user?.id ?? ""
          })
        }
      });
      const data = await response.json();
      setWishlisted(data);
      console.log(wishlisted)
      return data;
    } catch (error) {
      console.error("Error checking wishlist:", error);
    }
  };

  useEffect(() => {

    fetchWishlisted();
  }, [session?.user]);


  return (
    <section>
      <h1 className="text-3xl font-bold">Your Wishlist</h1>

      <div className="mt-10">
        <p className="text-xl">Your wishlist is empty</p>
      </div>

    </section>
  )
}

export default WishlistPage