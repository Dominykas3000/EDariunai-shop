/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { IoCartSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
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
  description: string;
  name: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

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
      className={`flex justify-center border-solid items-center font-medium align-middle select-none font-sans text-sm text-center border-slate-400 border transition-all py-2 px-4 rounded-lg bg-white text-gray-900 shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none w-full ${wishlisted ? " text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800" : ""
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
  };

  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-2xl dark:bg-gray-800 bg-clip-border rounded-xl w-80 h-auto">
      <div className="mx-4 mb-6 mt-4 shadow-inner rounded-xl shadow-blue-gray-500/40 min-h-[310px] flex justify-center items-center">
        <img
          className="rounded-xl object-contain max-h-[280px]"
          src={product.image ? product.image :
            "https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"}
          alt="card-image"
        />
      </div>

      <div className="px-6">
        <h5 className="dark:text-white block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {product.name}
        </h5>

        <h6 className="block dark:text-white mb-2 font-sans text-sm antialiased font-normal leading-snug tracking-normal text-blue-gray-900">
          {product.sellerId.name ?
            (
              <Link
                href={`/seller-page/${encodeURIComponent(product.sellerId._id)}`}>
                {"By: " + product.sellerId.name}
              </Link>
            ) : ''
          }
        </h6>
        <div className="min-h-[50px] max-h-[50px] overflow-hidden text-ellipsis">
          <p className=" block font-sans dark:text-white antialiased text-xs"
            style={{
              // @ts-ignore
              // "-webkit-box-orient": "vertical",
              // "-webkit-line-clamp": "3",
              "display": "-webkit-box",
              "WebkitBoxOrient": "vertical",
              "WebkitLineClamp": "vertical",
              "overflow": "hidden",
              "textOverflow": "ellipsis",
            }}>
            {product.description}
          </p>
        </div>
      </div>

      <div className="flex justify-between p-6 items-end	min-h-[92px]">
        {product.salePrice ? (
          <div className="flex-col">
            <h5 className="font-sans font-semibold leading-snug tracking-normal text-red-500">
              Sale Price: ${product.salePrice}
            </h5>
            <h5 className="font-sans  leading-snug dark:text-white tracking-normal text-gray-600 line-through">
              Price: ${product.price}
            </h5>
          </div>
        ) : (
          <h5 className="font-sans font-semibold leading-snug tracking-normal dark:text-white text-blue-gray-900">
            Price: ${product.price}
          </h5>
        )}

        <h5 className="block dark:text-white text-sm text-blue-gray-900">
          Stock: {product.stock}
        </h5>
      </div>

      <div className="px-6 flex justify-between gap-2 pb-2 pt-0">
        <div className="w-1/2">
          <Link href={`/product-page/${encodeURIComponent(product._id)}`}>
            <button
              className=" w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
            >
              Read More
            </button>
          </Link>
        </div>

        <div className="w-1/2">
          <Button
            aria-label="Add to cart"
            size="sm"
            className="px-6 py-3 rounded-sm max-h-[40px] h-full w-full"
            onClick={() => {
              handleAddToCart(product);
            }}
          >
            <IoCartSharp style={{ "width": "1.75em", "height": "1.75em" }} />
          </Button>
        </div>
      </div>

      <div className="flex px-6 pb-4 w-full">
        {wishlistButton}
      </div>
    </div>
  );
};

export default ProductCard;
