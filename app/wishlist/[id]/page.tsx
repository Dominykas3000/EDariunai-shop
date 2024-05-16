"use client";
import WishlistCards from "@/components/wishlistCard";
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

export default function WishlistPage({ params }: { params: { id: string } }) {


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
            userId: params.id ?? ""
          })
        }
      });
      const data = await response.json();
      setWishlisted(data.wishlist);
      console.log(data.wishlist)
      console.log(wishlisted)
      return data;
    } catch (error) {
      console.error("Error checking wishlist:", error);
    }
  };

  useEffect(() => {

    fetchWishlisted();
  }, []);


  return (
    <section>
      <h1 className="text-3xl font-bold">Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-20">
        {
          wishlisted.length > 0 ?
            (
              wishlisted.map((product, index) => (
                <WishlistCards
                  key={index}
                  props={product}
                />
              ))
            )
            :
            <p className="text-xl mt-10">Your wishlist is empty</p>
        }
      </div>
    </section>
  )
}

