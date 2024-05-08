/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";

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
  description: string;
  name: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cartItems } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-2xl  bg-clip-border rounded-xl w-80 h-auto">
      <div className="mx-4 pb-6 mt-4 shadow-inner rounded-xl shadow-blue-gray-500/40">
        <img
          className="rounded-xl"
          src="https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"
          alt="card-image"
        />
      </div>

      <div className="px-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {product.name}
        </h5>

        <h6 className="block mb-2 font-sans text-sm antialiased font-normal leading-snug tracking-normal text-blue-gray-900">
          By: {product.sellerId ? product.sellerId.name : ""}
        </h6>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {product.description}
        </p>
      </div>
      <div className="flex justify-between p-6 items-end	min-h-[92px]">
        {product.salePrice ? (
          <div className="flex-col">
            <h5 className="font-sans font-semibold leading-snug tracking-normal text-red-500">
              Sale Price: ${product.salePrice}
            </h5>
            <h5 className="font-sans  leading-snug tracking-normal text-gray-600 line-through">
              Price: ${product.price}
            </h5>
          </div>
        ) : (
          <h5 className="font-sans font-semibold leading-snug tracking-normal text-blue-gray-900">
            Price: ${product.price}
          </h5>
        )}

        <h5 className="block text-sm text-blue-gray-900">
          Stock: {product.stock}
        </h5>
      </div>
      <div className="px-6 flex justify-between pb-8 pt-0">
        <Link href={`/product-page/${encodeURIComponent(product._id)}`}>
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Read More
          </button>
        </Link>
        <Button
          aria-label="Add to cart"
          size="sm"
          className="h-8 rounded-sm"
          onClick={() => {
            handleAddToCart(product);
          }}
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
