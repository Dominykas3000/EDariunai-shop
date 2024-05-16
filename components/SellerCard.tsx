/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface Seller {
  _id: string;
  creator: string;
  description: string;
  name: string;
}

const SellerCard: React.FC<{ seller: Seller }> = ({ seller }) => {

  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-2xl  bg-clip-border rounded-xl w-80 h-auto">
      <div className="mx-4 mb-6 mt-4 shadow-inner rounded-xl shadow-blue-gray-500/40 min-h-[310px] flex justify-center items-center">
        <img
          className="rounded-xl object-contain max-h-[280px]"
          src={"https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"}
          alt="card-image"
        />
      </div>

      <div className="px-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {seller.name}
        </h5>

        {/* <h6 className="block mb-2 font-sans text-sm antialiased font-normal leading-snug tracking-normal text-blue-gray-900">
          By: {product.sellerId ? product.sellerId.name : ""}
        </h6> */}
        <div className="min-h-[50px] max-h-[50px] overflow-hidden text-ellipsis">
          <p className=" block font-sans antialiased text-xs"
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
            <b>Description:</b> {seller.description}
          </p>
        </div>
      </div>

      <div className="flex justify-between p-6 items-end	min-h-[92px]">
        {/* {product.salePrice ? (
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
      </div> */}

        {/* <div className="px-6 flex justify-between gap-2 pb-2 pt-0"> */}
        <div className="w-full">
          <Link href={`/seller-page/${encodeURIComponent(seller._id)}`}>
            <button
              className=" w-full align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
            >
              Read More
            </button>
          </Link>
          {/* </div> */}

        </div>


      </div>
    </div>
  );
};

export default SellerCard;
