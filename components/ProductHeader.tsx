"use client";
/* eslint-disable @next/next/no-img-element */
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  stock: number;
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

  const { addToCart, cartItems } = useCart();
  const handleAddToCart = (product: Product) => {
    addToCart(product);
  }

  return (
    <section className="flex items-start w-full mb-6 text-xs justify-start gap-8">
      <div className="flex flex-col items-start w-1/2">
        <div className="w-full">
          <img src="https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"
            alt="card-image" />
        </div>
      </div>
      <div className="flex flex-col h-auto justify-between items-start min-h-[405px] w-1/2">

        <div className="">
          <div className="mb-[.5rem]">
            <h1 className="font-bold text-[2.5rem] leading-[1.2]">{product.name}</h1>
          </div>

          <div className="mb-[1.5rem]">
            <h1 className="font-bold text-[1.5rem] leading-[1.4]">${product.price}</h1>
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

        <div className="flex gap-6 w-full">

          <button
            className="w-full text-white bg-gray-900 hover:bg-gray-800  font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
            onClick={() => {
              handleAddToCart(product);
            }}
          >
            Add to cart
          </button>

        </div>

      </div>
    </section>
  )
}

export default ProductHeader