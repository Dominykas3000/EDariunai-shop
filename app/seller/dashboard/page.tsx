import Link from "next/link";
import ItemsList from "@/components/ItemsList";

const DashboardPage = () => {
  return (
    <div>
      <header>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-center mb-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Here you can add, delete and update<br /> the products you want to sell !
          </h1>
        </div>
      </header>
      <main>
        <div>
          <div>
            {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-72 w-96 flex items-center justify-center mb-4">
              <p className="text-center text-gray-400">
                Statistics Placeholder
              </p>
            </div> */}
          </div>
        </div>
        <div className="flex justify-between items-center bg-slate-800 px-8 py-3">
          <h2 className="text-white font-bold"> Your Items </h2>
          <Link className="bg-white p-2 mb-8 mt-8 border-4 justify-center items-center dark:text-black" href={"/addItem"}>
            Add Item
          </Link>
        </div>
        <ItemsList />
      </main>
    </div>
  );
};

export default DashboardPage;
