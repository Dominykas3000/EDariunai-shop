"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EditItemForm = ({
  id,
  name,
  price,
  description,
  tags,
  stock,
  category,
}: {
  id: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  stock: number;
  category: string;
}) => {
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const [newDescription, setNewDescription] = useState(description);
  const [newTags, setNewTags] = useState(tags);
  const [newStock, setNewStock] = useState(stock);
  const [newCategory, setNewCategory] = useState(category);
  const [newImage, setNewImage] = useState("");
  const [salePrice, setSalePrice] = useState(0);
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/item`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          itemId: id,
          newName,
          newPrice,
          newDescription,
          newTags,
          newStock,
          newImage,
          salePrice,
          newStartDate,
          newEndDate,
          newCategory,
        }),
      });

      console.log(salePrice);
      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Item Name"
      />
      <input
        onChange={(e) => setNewPrice(Number(e.target.value))}
        value={newPrice}
        className="border border-slate-500 px-8 py-2"
        type="Number"
        placeholder="Item Price (in Eur)"
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Item Description"
      />
      <input
        onChange={(e) => setNewTags([e.target.value])}
        value={newTags}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Tags"
      />
      <input
        onChange={(e) => setNewStock(Number(e.target.value))}
        value={newStock}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Stock"
      />
      <input
        onChange={(e) => setNewCategory(e.target.value)}
        value={newCategory}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Category"
      />
      <input
        onChange={(e) => setNewImage(e.target.value)}
        value={newImage}
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Image URL"
      />
      <input
        onChange={(e) => setSalePrice(Number(e.target.value))}
        value={salePrice}
        className="border border-slate-500 px-8 py-2"
        type="number"
        placeholder="Sale Price"
      />
      <div>
        <label className="text-gray-900">Sale Start Date</label>
        <input
          onChange={(e) => setNewStartDate(e.target.value)}
          value={newStartDate}
          className="border border-slate-500 px-8 py-2"
          type="date"
          placeholder="Sale Start Date"
        />
      </div>
      <div>
        <label className="text-gray-900">Sale End Date</label>
        <input
          onChange={(e) => setNewEndDate(e.target.value)}
          value={newEndDate}
          className="border border-slate-500 px-8 py-2"
          type="date"
          placeholder="Sale End Date"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-800"
      >
        Update Item
      </button>
    </form>
  );
};

export default EditItemForm;
