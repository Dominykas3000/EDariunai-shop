/* eslint-disable @next/next/no-img-element */
import Seller from "@/models/seller";
import ProductCard from "@/components/ProductCard";
import SellerReview from "@/components/SellerReview";
import { connectToDatabase } from "@/utils/database";


const getSellerById = async ({ sellerId }: { sellerId: string }) => {
  try {

    connectToDatabase();

    const seller = await Seller.findById(sellerId)
      .populate("creator")
      .populate("storeItems")
      .populate("sellerReviews");

    return JSON.stringify(seller);
  } catch (error) {
    console.error("Failed to fetch item", error);
  }
};

export default async function SellerPage({ params }: { params: { id: string } }) {

  const seller = await getSellerById({ sellerId: params.id })


  return (
    <section className=" mb-6 justify-start w-full flex px-4 flex-col gap-6">
      <div className="w-full flex flex-row max-h-[450px]">

        <div className="w-1/2">
          <h1 className="font-bold text-[2.5rem] leading-[1.2]">
            Seller: {seller ? JSON.parse(seller).name : "no data"}
          </h1>

          <p className="text-[1.5rem]">Description: {seller ? JSON.parse(seller).description : "no data"}</p>
        </div>

        <div className="w-1/2">
          <img
            className="rounded-xl object-contain w-full h-auto max-h-[450px]"
            src={
              // @ts-ignore
              JSON.parse(seller).creator.image ? JSON.parse(seller).creator.image :
                "https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"
            }
            alt="card-image" />
        </div>

      </div>

      <div className="mt-20">
        <h1 className="font-bold text-[2.5rem] leading-[1.2]">Reviews:</h1>
        <div className="flex flex-row flex-wrap gap-4">
          {seller ? JSON.parse(seller).sellerReviews.map((review: any) => {
            return (
              <div key={review._id} className="p-4 bg-gray-100 rounded-xl w-1/3">
                <h2 className="font-bold text-[1.5rem]">{review.review}</h2>
                <p className="text-[1rem]">{review.rating}/5</p>
              </div>
            );
          }) : "no data"}
        </div>

        {seller && <SellerReview props={JSON.parse(seller)._id} />}
      </div>

      <div className="mt-20">
        <h1 className="font-bold text-[2.5rem] leading-[1.2]">Products</h1>

        <div className="flex flex-row flex-wrap gap-4">

          {seller ? JSON.parse(seller).storeItems.map((item: any) => {
            return (
              <ProductCard
                key={item._id}
                product={item}
              ></ProductCard>

            );
          }) : "no data"}

        </div>
      </div>

    </section >

  );

} 