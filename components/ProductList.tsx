import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("/api/all-items");
      console.log(response);
      const data = await response.json();
      console.log(data.items);
      const sortedData = data.items.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setItems(sortedData);
    };
    fetchItems();
  }, []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {items.map((product: any, index: number) => (
        <ProductCard key={index} product={product} />
      ))}
    </section>
  );
}
