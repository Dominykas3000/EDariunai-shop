import ProductHeader from "@/components/ProductHeader";
import ProductReviews from "@/components/ProductReviews";
import Item from "@/models/item";
import Seller from "@/models/seller";
import ItemReview from "@/models/itemreview";

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


export default async function ItemPage({ params }: { params: { id: string } }) {

  const item = await getItemById({ itemId: params.id })
  let itemString = JSON.parse(item || "");
  const reviews = itemString.itemReviews ? itemString.itemReviews : null;

  return (
    <>
      {item ? <ProductHeader product={itemString} /> : <span>no data</span>}

      <div className="mt-10 w-full">
        {item && <ProductReviews props={itemString._id} />}

      </div>

      <div className="mt-10 w-full">
        <h1 className="font-bold text-[2.5rem] leading-[1.2]">Reviews:</h1>
        <div className="flex flex-row flex-wrap gap-4">
          {
            reviews.length > 0 ? reviews.map((review: any) => {
              return (
                <div key={review._id} className="p-4 bg-gray-100 rounded-xl w-1/3">
                  <h2 className="font-bold text-[1.5rem]">{review.review}</h2>
                  <p className="text-[1rem]">{review.rating}/5</p>
                </div>
              )
            })
              : <span>no reviews</span>}
        </div>
      </div>
    </>

  );

}