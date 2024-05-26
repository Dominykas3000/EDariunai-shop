'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";


const ItemFilter = (props: any) => {

  const { searchParams } = props;
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(searchParams);


  const router = useRouter();

  console.log(price)

  function categoryValue() {
    const category = document.getElementById('category') as HTMLSelectElement;
    const selectedCategory = category.value;
    console.log(selectedCategory);
    setCategory(selectedCategory);

    // const url = new URL(window.location.href);
    // url.searchParams.set('category', selectedCategory);
    // window.location.href = url.toString();

  }

  function filterOptions() {
    setLoading(true);
    const url = new URL(window.location.href);
    url.searchParams.delete('page');
    url.searchParams.set('category', category);
    url.searchParams.set('price', price);
    window.location.href = url.toString();
  }

  function clearFilters() {
    const url = new URL(window.location.href);
    url.searchParams.delete('category');
    url.searchParams.delete('price');
    url.searchParams.delete('page');
    window.location.href = url.toString();
  }

  return (
    <div className="mx-auto px-2">
      <div className="flex text-center md:flex-row items-end gap-3 xs:flex-col">
        <h4 className="xs:w-full md:w-auto  text-xl text-left font-bold">Filter all items:</h4>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col">

            <select
              id="category"
              required
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
              value={searchParams.category && category == '' ? searchParams.category : category}
              onChange={() => categoryValue()}
            >
              <option value="">Select a category</option>
              <option value="Phones">Phones</option>
              <option value="Shoes">Shoes</option>
              <option value="Jackets">Jackets</option>
              <option value="Shirts">Shirts</option>
              <option value="T-shirts">T-shirts</option>
              <option value="Hats">Hats</option>
              <option value="Tech">Tech</option>
            </select>
          </div>

          <div className="flex flex-col">
            <input
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              type="number"
              placeholder="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-row xs:justify-between md:justify-start xs:w-full md:w-auto">
          <button
            className="bg-gray-900 text-white font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
            onClick={() => filterOptions()}
            disabled={category == '' && price == '' || loading}

          >
            Filter
          </button>


          <button
            className="bg-white dark:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900  dark:focus:ring-gray-800"
            onClick={() => clearFilters()}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemFilter;
