"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from './ProductCard';  // Import the ProductCard component

async function getData() {
  try {
    const response = await fetch("/api/popularitems");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular items:", error);
  }
}

export default function PopularItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getData();
        if (data) {
          setItems(data.items);
        }
      } catch (error) {
        console.error("Error fetching popular items:", error);
      }
    }
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Popular Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item: any) => (
          <ProductCard product={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}
