import Link from 'next/link';
import { useState, useEffect } from 'react';

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
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchButtonPressed, setSearchButtonPressed] = useState(false);

  const noSearchResultsDiv = (
    <div className='absolute bg-white shadow-2xl rounded-m top-[60px] md:w-[calc(100vw-330px)] md:max-w-[500px] xs:max-w-unset xs:w-full z-40 overflow-auto max-h-[350px] border border-black rounded-b-lg'>
      <p className='text-lg font-bold py-2 px-2'>No search results found</p>
    </div>
  );

  const searchingDiv = (
    <div className='absolute bg-white shadow-2xl rounded-m top-[60px] w-[calc(100vw-330px)] max-w-[500px] xs:max-w-unset xs:w-full z-40 overflow-auto max-h-[350px] border border-black rounded-b-lg'>
      <p className='text-lg font-bold py-2 px-2'>Searching...</p>
    </div>
  );

  const fetchSearchResults = async () => {
    try {
      setIsSearching(true);

      if (searchTerm.trim() === '') {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

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
      setIsSearching(false);

    } catch (error) {
      console.error('Error fetching search results:', error);
      setIsSearching(false);
    }
  };

  const handleSearch = () => {
    fetchSearchResults();
    setSearchButtonPressed(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchButtonPressed(false);
  };

  return (
    <div className='flex flex-col py-3 relative w-[calc(100vw-330px)] max-w-[500px] xs:max-w-unset xs:w-full'>
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
        <button type="submit"
          onClick={handleSearch}
          disabled={isSearching}
          className="text-white absolute end-2.5 top-[5px] bottom-[5px] align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs px-2  rounded-lg bg-gray-900  shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">Search</button>
      </div>

      {isSearching ? searchingDiv : ''}

      {
        searchButtonPressed &&
        searchTerm.trim() !== '' &&
        searchResults.length === 0 &&
        !isSearching &&
        noSearchResultsDiv
      }

      {
        searchTerm.trim() !== '' && searchResults.length > 0 ?
          (
            <ul className='absolute bg-white shadow-2xl rounded-m top-[60px] w-[calc(100vw-330px)] max-w-[500px] z-40 overflow-auto max-h-[350px] border border-black rounded-b-lg dark:bg-gray-700 xs:max-w-unset xs:w-full'>
              {searchResults.map((item: Product, index: number) => (
                <li className='flex flex-row justify-between gap-2 border-b border-zinc-800 mb-2 px-3' key={index}>
                  <div className='flex flex-col mb-2'>
                    <h3>Name: {item.name}</h3>
                    <p className='text-sm'>Price:  ${item.price}</p>
                  </div>
                  <div className='flex justify-center items-center'>
                    <Link href={`/product-page/${encodeURIComponent(item._id)}`}>
                      <button className='bg-gray-700 dark:bg-gray-900 text-white rounded-md px-2 py-1'>
                        Read more
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : ''
      }
    </div>
  );
}

export default SearchComponent;