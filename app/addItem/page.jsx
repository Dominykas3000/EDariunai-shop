"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const AddItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter();

  const { data: session } = useSession();
  // console.log(session);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!name || !price || !description || !tags || !stock || !category) {
      alert("Please fill all the fields");
      return;
    }

      try {
       const res = await fetch('http://localhost:3000/api/item', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            price,
            description,
            tags,
            stock,
            category,
            sellerId: session?.user?.id,
          }),
      });
        if(res.ok) {
          router.push('/dashboard');
        } else {
          throw new Error('Failed to create an item');
        }

      } catch (error) {
        console.log(error);
      }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Item Name"
      />
      <input
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className="border border-slate-500 px-8 py-2"
        type="Number"
        placeholder="Item Price (in Eur)"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Item Description"
      />
      <input
        onChange={(e) => setTags(e.target.value)}
        value={tags}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Tags"
      />
      <input
        onChange={(e) => setStock(e.target.value)}
        value={stock}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Stock"
      />
      <input
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Category"
      />
      <button
        type="submit"
        className="w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800">
        Add Item
      </button>
    </form>
  );
};

export default AddItem;
