import ProductHeader from "@/components/ProductHeader";
import ProductReviews from "@/components/ProductReviews";
import Item from "@/models/item";
import Seller from "@/models/seller";
import ItemReview from "@/models/itemreview";
import { DeleteReview } from "@/components/DeleteReview";
import User from "@/models/user";

const getItemById = async ({ itemId }: { itemId: string }) => {
  try {
    console.log("itemid", itemId)
    const item = await Item.findById(itemId)
      .populate({ path: 'sellerId', model: Seller })
      .populate({ path: 'itemReviews', model: ItemReview });

    if (item) {
      item.timesVisited += 1;
      console.log(item.timesVisited)
      await item.save();
    }

    return JSON.stringify(item);
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


export default async function ItemPage({ params }: { params: { id: string } }) {

  const item = await getItemById({ itemId: params.id })
  let itemString = JSON.parse(item || "");
  const reviews = itemString.itemReviews ? itemString.itemReviews : null;
  console.log(reviews)

  return (
    <>
      {item ? <ProductHeader product={itemString} /> : <span>no data</span>}

      <div className=" mt-8 flex md:px-0 items-start w-full mb-6 text-xs justify-start gap-8 px-4 xs:flex-col sm:flex-col md:flex-row ">
        <h1 className="font-bold text-[2.5rem] leading-[1.2]">Reviews:</h1>
        <div className="flex flex-row flex-wrap gap-4  w-full">
          {
            reviews.length > 0 ? reviews.map((review: any) => {
              return (
                <div
                  key={review._id}
                  className="p-4 bg-gray-100 rounded-xl dark:bg-slate-800 
                  xs:w-full sm:w-full md:w-1/3 flex flex-col gap-2">
                  <p className="text-[1rem] font-bold">
                    Reviewer: {getReviewerName(review.reviewer)}
                  </p>
                  <p className="text-[1rem]">
                    <b>Rating:</b>{" "}{review.rating}/5
                  </p>
                  <h2 className=" text-[0.75rem]">
                    {review.review}
                  </h2>
                  <DeleteReview reviewId={review._id} />
                </div>
              )
            })
              : <span>no reviews</span>}
        </div>
      </div>

      <div className="flex md:px-0 items-start w-full mb-6 text-xs justify-start gap-8 px-4 mt-5">
        {item && <ProductReviews props={itemString._id} />}
      </div>
    </>

  );

}