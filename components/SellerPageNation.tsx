import { connectToDatabase } from "@utils/connectMongo";
import Link from "next/link";
import SellerCard from "./SellerCard";

async function getData(perPage: any, page: any,) {
  try {
    const client = await connectToDatabase();
    const db = client.db("test");

    const sellers = await db.collection("sellers")
      .find({})
      .skip(perPage * (page - 1))
      .limit(perPage)
      .toArray();

    const sellersCount = await db.collection("sellers").countDocuments();

    return { sellers, sellersCount };
  } catch (error) {
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

const SellerPageNation = async (props: any) => {
  const { searchParams } = props;

  let page = parseInt(searchParams.page, 10);
  page = !page || page < 1 ? 1 : page;
  const perPage = 6;


  const data = await getData(perPage, page);

  const totalPages = Math.ceil(data.sellersCount / perPage);
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
        {data.sellers.map((seller: any, index: any) => (
          <SellerCard key={index} seller={seller} />

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

export default SellerPageNation