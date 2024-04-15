"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ itemId }: { itemId: string }) {
  const router = useRouter();
  
  const removeItem = async () => {
    const confirmed = confirm("Are you sure you want to delete this item?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/item/${itemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <div>
      <button onClick={removeItem} className="text-red-400">
        <HiOutlineTrash size={24} />
      </button>
    </div>
  );
}
