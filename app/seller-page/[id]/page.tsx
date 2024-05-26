/* eslint-disable @next/next/no-img-element */
import Seller from "@/models/seller";
import Item from "@/models/item";
import User from "@/models/user";
import SellerReview from "@/models/sellerreview";
import ProductCard from "@/components/ProductCard";
import SellerReviews from "@/components/SellerReview";
import { connectToDatabase } from "@/utils/connectMongo";
import AdminControls from "@/components/AdminControls";
import { DeleteSellerReview } from "@/components/DeleteSellerReview";


const getSellerById = async ({ sellerId }: { sellerId: string }) => {
  try {

    connectToDatabase();

    const seller = await Seller.findById(sellerId)
      .populate({ path: "creator", model: User })
      .populate({ path: "storeItems", model: Item })
      .populate({ path: "sellerReviews", model: SellerReview });

    return JSON.stringify(seller);
  } catch (error) {
    console.error("Failed to fetch item", error);
  }
};

const getReviewerName = async (reviewerId: string) => {
  try {
    const reviewer = await User.findById(reviewerId);
    console.log(reviewer);
    return reviewer.username;
  } catch (error) {
    console.error("Failed to fetch reviewer", error);
  }
}

const averageReviewRating = (reviews: any) => {
  let total = 0;
  reviews.forEach((review: any) => {
    total += review.rating;
  });
  return total / reviews.length;
}

export default async function SellerPage({ params }: { params: { id: string } }) {

  const seller = await getSellerById({ sellerId: params.id })
  let sellerString = JSON.parse(seller || "");
  let averageRating = sellerString.sellerReviews ? averageReviewRating(sellerString.sellerReviews) : "No reviews yet";

  return (
    <section
      className="divide-y-4 divide-slate-400/2 mb-6 justify-start w-full flex px-4 flex-col gap-6 relative">
      <div>
        {sellerString.flagged && (
          <div className="bg-red-500 text-white p-2 rounded-md w-fit">
            This seller is not fully trusted.
          </div>
        )}

        <div className="absolute top-[-60px] right-[35px]">
          <AdminControls sellerId={params.id} />
        </div>

        <div className="flex md:px-0 items-start w-full mb-6 text-xs justify-start gap-8 px-4 xs:flex-col sm:flex-col md:flex-row  md:max-h-[450px] ">

          <div className="md:w-1/2 w-full flex flex-col gap-4">
            <h1 className="font-bold text-[2.5rem] leading-[1.2] sm:text-[2rem] sm:leading-[1.1] md:text-[2.5rem] md:leading-[1.2] lg:text-[3rem] lg:leading-[1.3]">
              Seller: {sellerString.name ? sellerString.name : "no data"}
            </h1>
            <p className="text-[1.5rem] leading-[1.6] sm:text-[1.25rem] sm:leading-[1.5] md:text-[1.5rem] md:leading-[1.6] lg:text-[1.75rem] lg:leading-[1.7] overflow-hidden">
              <b>Description:</b> {seller ? sellerString.description : "no data"}
            </p>

            <p className="text-[1.5rem] leading-[1.6] sm:text-[1.25rem] sm:leading-[1.5] md:text-[1.5rem] md:leading-[1.6] lg:text-[1.75rem] lg:leading-[1.7]">
              <b>Email:</b> {seller ? sellerString.creator.email : "no data"}
            </p>

            <p className="text-[1.5rem] leading-[1.6] sm:text-[1.25rem] sm:leading-[1.5] md:text-[1.5rem] md:leading-[1.6] lg:text-[1.75rem] lg:leading-[1.7]">
              <b>Average Rating:</b> {averageRating}/5
            </p>

          </div>

          <div className="md:w-1/2 w-full flex justify-center">
            <div className="shadow-2xl rounded-xl shadow-blue-gray-500/40 flex justify-center items-center">
              <img
                className="rounded-xl object-contain h-auto max-h-[450px]"
                src={
                  sellerString.creator.image ? sellerString.creator.image :
                    "https://assets-global.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"
                }
                alt="card-image" />
            </div>
          </div>

        </div>

      </div>

      <div className="mt-10 ">
        <div className="flex md:px-0 items-start w-full mb-6 text-xs justify-start gap-8 px-4 flex-col ">
          <h1 className="mt-8 font-bold text-[2.5rem] leading-[1.2]">Reviews:</h1>

          <div className="flex xs:flex-col sm:flex-col md:flex-row flex-wrap gap-4">

            {
              seller ?
                sellerString.sellerReviews.map((review: any) => {
                  return (
                    <div key={review._id} className="p-4 bg-gray-100 rounded-xl dark:bg-slate-800 md:w-1/3 w-full">
                      <p className="text-[1rem] font-bold">
                        Reviewer: {getReviewerName(review.reviewer)}
                      </p>
                      <p className="text-[1rem]">
                        <b>Rating:</b>{" "}{review.rating}/5
                      </p>
                      <h2 className=" text-[0.75rem]">
                        {review.review}
                      </h2>
                      <DeleteSellerReview reviewId={review._id} />
                    </div>
                  );
                })
                : "no data"
            }

          </div>
        </div>

        {seller && <SellerReviews props={sellerString._id} />}
      </div>

      <div className="mt-10">
        <h1 className="mt-8 font-bold text-[2.5rem] leading-[1.2]">Products:</h1>

        <div className="flex flex-row flex-wrap gap-4">

          {
            sellerString.storeItems.length > 0 ?
              sellerString.storeItems.map((item: any) => {
                return (
                  <ProductCard
                    key={item._id}
                    product={item}
                  ></ProductCard>

                );
              })
              : "no data"
          }

        </div>

      </div>

    </section >
  );
} 