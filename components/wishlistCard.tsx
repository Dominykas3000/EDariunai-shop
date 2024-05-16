import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
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



export default function WishlistCards({ props }: { props: Product }) {



  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-lg">
        <img
          src={props.image ? props.image : "https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"}
          alt={props.name}
          className="w-32 h-32 object-cover rounded-full"
        />
        <div className="w-full flex flex-col justify-start mt-6">
          <h2 className="mt-4 text-xl font-bold"> {props.name}</h2>
          <p className="text-sm text-gray-500">Description:  {props.description}</p>
          <p className="text-sm text-gray-500">Price: {props.price}</p>
          <p className="text-sm text-gray-500">Stock: {props.stock}</p>
          <p className="text-sm text-gray-500">Category: {props.category}</p>
        </div>
        <div className="w-full m-4">
          <Link href={`/product-page/${encodeURIComponent(props._id)}`}>
            <button
              className=" w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
            >
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
