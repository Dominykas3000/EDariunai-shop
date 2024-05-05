import ProductCard from "@/components/ProductCard";
import { connectToDatabase } from "@utils/connectMongo";
import Link from "next/link";
import Item from "@/models/item";
import Seller from "@/models/seller";
import { useState } from "react";

async function getData(perPage: any, page: any, filters: any) {
  try {
    // Connect to MongoDB
    const client = await connectToDatabase();
    const db = client.db("test");

    // MongoDB query filter
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

    // Get total count of filtered items
    const itemCount = await db.collection("items").countDocuments(queryFilter);

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

  // Extract filters from searchParams
  const [filters, setFilters] = useState({
    price: searchParams.price || '',
    tags: searchParams.tags || '',
    category: searchParams.category || ''
  });
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

      <div className="mx-auto">
        <div className="flex flex-row items-end gap-3" >
          <h4 className="text-xl font-bold">Filter all items:</h4>
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="block mb-2 text-base font-medium text-gray-900 ">
              Category:
            </label>
            <select
              id="category"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5  dark:border-gray-500 dark:placeholder-gray-400"
            >
              <option value="">Select a category</option>
              <option value="Phones">Phones</option>
              <option value="Shoes">Shoes</option>
              <option value="Jackets">Jackets</option>
              <option value="Shirts">Shirts</option>
              <option value="T-shirts">T-shirts</option>
              <option value="Something More">Hats</option>
              <option value="Something More">Tech</option>
            </select>
          </div>
          <Link href="/all-items-page">
            <button className="bg-gray-900 text-white font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800">Clear Filters</button>
          </Link>

        </div>

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
