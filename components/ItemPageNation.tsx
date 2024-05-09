import Link from "next/link"
import ProductCard from "@/components/ProductCard";
import { connectToDatabase } from "@utils/connectMongo";
import Item from "@/models/item";
import Seller from "@/models/seller";

async function getData(perPage: any, page: any, filters: any) {
  try {
    const client = await connectToDatabase();
    const db = client.db("test");
    const queryFilter: any = {};

    if (filters.price) {
      console.log(filters.price);
      queryFilter.price = { $lte: parseFloat(filters.price) };
    }

    if (filters.tags) {
      console.log(filters.tags);
      queryFilter.tags = { $in: filters.tags.split(',') };
    }

    if (filters.category) {
      console.log(filters.category);
      queryFilter.category = filters.category;
    }

    const items = await db.collection("items")
      .find(queryFilter)
      .skip(perPage * (page - 1))
      .limit(perPage)
      .toArray();

    const itemCount = await db.collection("items").countDocuments(queryFilter);
    const sellerIds = items.map((item: any) => item.sellerId);

    const sellers = await db.collection("sellers")
      .find({ _id: { $in: sellerIds } })
      .toArray();

    const populatedItems = items.map((item: any) => {
      const seller = sellers.find((seller: any) => seller._id.equals(item.sellerId));
      delete item.sellerId;
      return { ...item, sellerId: seller };
    });

    return { items: populatedItems, itemCount };
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

const ItemPageNation = async (props: any) => {
  const { searchParams } = props;

  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 6;

  const filters = {
    price: searchParams.price || '',
    tags: searchParams.tags || '',
    category: searchParams.category || ''
  }
  // Fetch data
  const data = await getData(perPage, page, filters);

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
      )}</>
  )
}

export default ItemPageNation