import Link from "next/link";

export default function SellerSideBar() {
  return (
    <div className="min-h-[76px]  w-full -mt-[86px]" >
      {/* <div className="flex flex-row items-center p-4">
        <h2 className="text-white mt-4">Seller</h2>
      </div> */}
      <div className="flex w-[95%] mr-auto ml-auto justify-between flex-row mt-8">
        <div>
          <Link
            href="/seller/dashboard"
            className="block text-gray-800 p-2 hover:border-b-2 border-gray-700"
          >
            Dashboard
          </Link>
        </div>

        <div>
          <Link
            href="/seller/orders"
            className="block text-gray-800 p-2 hover:border-b-2 border-gray-700"
          >
            Orders
          </Link>
        </div>
        <div>
          <Link
            href="/seller/statistics"
            className="block text-gray-800 p-2 hover:border-b-2 border-gray-700"
          >
            Statistics
          </Link>
        </div>
      </div>
    </div>
  );
}
