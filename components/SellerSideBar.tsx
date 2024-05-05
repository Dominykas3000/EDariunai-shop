import Link from "next/link";

export default function SellerSideBar() {
  return (
    <div className="w-1/6 bg-gray-800 h-full">
      <div className="flex flex-col items-center p-4">
        <h2 className="text-white mt-4">Seller</h2>
      </div>
      <nav className="mt-8">
        <ul className="space-y-4">
          <li>
            <Link
              href="/seller"
              className="block text-white p-4 hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/seller/dashboard"
              className="block text-white p-4 hover:bg-gray-700"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/seller/statistics"
              className="block text-white p-4 hover:bg-gray-700"
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              href="/seller/settings"
              className="block text-white p-4 hover:bg-gray-700"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
