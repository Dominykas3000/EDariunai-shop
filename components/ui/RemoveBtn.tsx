"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RemoveBtn({ itemId }: { itemId: string }) {
  const router = useRouter();

  const removeItem = async () => {
    const confirmed = confirm("Are you sure you want to delete this item?");

    if (confirmed) {
      const res = await fetch(`/api/item`, {
        method: "DELETE",
        headers: {
          data: itemId,
        },
      });

      if (res.ok) {
        router.refresh();
        toast("Item deleted successfully");
      }

      if (!res.ok) {
        toast("Failed to delete item, please try again later");
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
