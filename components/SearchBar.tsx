import { useState, useEffect } from 'react';
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  stock: number;
  category: string;
  seller: Seller;
  sellerId: string;
  salePrice?: number;
}

interface Seller {
  _id: string;
  creator: string;
  description: string;
  name: string;
}

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { addToCart, cartItems } = useCart();



  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {

        console.warn("searchTerm", searchTerm);
        const response = await fetch(`/api/search-item`, {
          method: 'GET',
          headers: {
            data: searchTerm,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data = await response.json();
        setSearchResults(data.items);

      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='flex flex-col py-3 relative w-[calc(100vw-330px)] max-w-[500px]'>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          value={searchTerm}
          onChange={handleInputChange}
          type="search" id="default-search"
          className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Items, Logos..."
          required
        />
      </div>


      <ul className='absolute bg-white shadow-2xl rounded-m top-[70px] w-[calc(100vw-330px)] max-w-[500px] z-40 overflow-auto max-h-[350px]'>
        {
          searchResults ? (searchResults.map((item: any, index: number) => (
            <li className='flex flex-row justify-between gap-2 border-b border-zinc-800 mb-2 px-3' key={index}>
              <div className='flex flex-col mb-2'>
                <h3>Name: {item.name}</h3>
                <p className='text-sm'>Price:  ${item.price}</p>
              </div>
              <div className='flex justify-center items-center'>
                <button className='bg-gray-700 text-white rounded-md px-2 py-1'
                  onClick={() => {
                    handleAddToCart(item);
                  }}
                >
                  Add to cart
                </button>
              </div>
              {/* <p>Description: {item.description}</p> */}
            </li>
          ))) : (<p>loading..</p>)
        }
      </ul>
    </div>
  );
}

export default SearchComponent;
