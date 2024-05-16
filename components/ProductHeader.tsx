"use client";
/* eslint-disable @next/next/no-img-element */
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  name: string;
  description: string;
}

interface ProductProps {
  product: Product;
}

const ProductHeader = ({ product }: ProductProps) => {

  const [wishlisted, setWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchWishlisted = async () => {
      if (!session) return;

      try {
        const response = await fetch("/api/wishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "data": JSON.stringify({
              productId: product._id,
              userId: session.user?.id ?? ""
            })
          }
        });
        const data = await response.json();
        setWishlisted(data.wishlisted);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    fetchWishlisted();
  }, [session, product._id]);

  function handleWishlist() {
    setLoading(true);

    fetch("/api/wishlist", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: product._id,
        userId: session?.user?.id ?? "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          setWishlisted(!wishlisted);
        }
        wishlisted ? toast("Item removed from wishlist!") : toast("Item added to wishlist!");
        setLoading(false);
      });
  }


  let wishlistButton = (
    <button
      className={`flex justify-center border-solid items-center font-medium align-middle select-none font-sans text-sm text-center border-slate-400 border transition-all px-5 py-2.5 rounded-lg bg-white text-gray-900 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full ${wishlisted ? " text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" : ""
        }`}
      type="button"
      disabled={!session?.user || loading}
      onClick={handleWishlist} >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-2 h-4 w-4"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      Wishlist
    </button >
  );

  const { addToCart, cartItems } = useCart();
  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast("Item added to cart!");
  }

  return (
    <section className="flex  items-start w-full mb-6 text-xs justify-start  md:flex-row  gap-8 md:px-0  px-4">
      <div className="flex flex-col items-start md:w-1/2 w-full">
        <div className="w-full">
          <img
            className="rounded-xl object-contain w-full h-auto"
            src={
              product.image ? product.image :
                "https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"
            }
            alt="card-image" />
        </div>
      </div>

      <div className="flex flex-col h-auto justify-between items-start min-h-[405px] md:w-1/2 w-full ">

        <div className="flex flex-col">
          <div className="mb-[.5rem]">
            <h1 className="font-bold text-[2.5rem] leading-[1.2]">{product.name}</h1>
          </div>

          <div className="mb-[1.5rem]">

            {product.salePrice ?
              (
                <div className="flex gap-2">
                  <h1 className="font-bold text-[1.5rem] leading-[1.4] line-through">
                    ${product.price}
                  </h1>
                  <h1 className="text-red-500 font-bold text-[1.5rem] leading-[1.4]">
                    ${product.salePrice}
                  </h1>
                </div>
              )
              :
              (
                <h1 className="font-bold text-[1.5rem] leading-[1.4]">
                  ${product.price}
                </h1>
              )
            }
          </div>

          <div className="mb-[1.5rem] min-h-[72px]">
            <p className="text-[1rem] leading-[1.4]">{product.description}</p>
          </div>

          <div className="h-[21px] mb-[1.5rem]">
            <h1 className="font-bold text-[1.5rem] leading-[1.4]">
              By: {product.sellerId.name}
            </h1>
          </div>

          <div className="inline-flex gap-5 mb-[1.5rem] min-h-[72px]">
            <p className="text-[1rem] leading-[1.4]">
              <b>Category</b>:{" "} {product.category}
            </p>
            <p className="text-[1rem] leading-[1.4]">
              <b>Tags</b>:{" "} {product.tags}
            </p>
          </div>

        </div>

        <div className="flex flex-col gap-6 w-full">

          <button
            className="w-full text-white bg-gray-900 hover:bg-gray-800  font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
            onClick={() => {
              handleAddToCart(product);
            }}
          >
            Add to cart
          </button>

          {wishlistButton}

        </div>

      </div>
    </section>
  )
}

export default ProductHeader