import ProductCard from "@/components/ProductCard";
import { connectToDatabase } from "@utils/connectMongo";
import Link from "next/link";
import Item from "@/models/item";
import Seller from "@/models/seller";

async function getData(perPage: any, page: any) {
  try {
    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db("test");

    const items = await db.collection("items")
      .find({})
      .skip(perPage * (page - 1))
      .limit(perPage)
      .toArray();

    // Get total count of items
    const itemCount = await db.collection("items").countDocuments({});

    // Fetch sellers for each item
    const sellerIds = items.map((item: any) => item.sellerId);
    const sellers = await Seller.find({ _id: { $in: sellerIds } });

    // Merge seller data into items
    const populatedItems = items.map((item: any) => {
      const seller = sellers.find((seller: any) => seller._id.equals(item.sellerId));
      return { ...item, seller };
    });

    return { items: populatedItems, itemCount };
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export default async function AllItemsPage({ searchParams }: any) {
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 6;

  // Fetch data
  const data = await getData(perPage, page);

  const totalPages = Math.ceil(data.itemCount / perPage);
  const prevPage = page - 1 > 0 ? page - 1 : 1;
  const nextPage = page + 1;
  const isPageOutOfRange = page > totalPages;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (let i = page - offsetNumber; i <= page + offsetNumber; i++) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <>
      <div className="mx-auto">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {data.items.map((item: any) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </section>

        {isPageOutOfRange ? (
          <div>No more pages...</div>
        ) : (
          <div className="flex justify-center items-center mt-16">
            <div className="flex border-[1px] gap-4 rounded-[10px] border-light-green p-4">
              {page === 1 ? (
                <div className="opacity-60" aria-disabled="true">
                  Previous
                </div>
              ) : (
                <Link href={`?page=${prevPage}`} aria-label="Previous Page">
                  Previous
                </Link>
              )}

              {pageNumbers.map((pageNumber, index) => (
                <Link
                  key={index}
                  className={
                    page === pageNumber
                      ? "bg-indigo-600 fw-bold px-2 rounded-md text-black"
                      : "hover:bg-indigo-600 px-1 rounded-md"
                  }
                  href={`?page=${pageNumber}`}
                >
                  {pageNumber}
                </Link>
              ))}

              {page === totalPages ? (
                <div className="opacity-60" aria-disabled="true">
                  Next
                </div>
              ) : (
                <Link href={`?page=${nextPage}`} aria-label="Next Page">
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );

}
