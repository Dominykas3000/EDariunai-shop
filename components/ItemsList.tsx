"use client";

import Link from "next/link";
import RemoveBtn from "./ui/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ItemsList() {
  const { data: session } = useSession();
  const [items, setItems] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (session?.user?.sellerId) {
      fetch(`/api/seller`, {
        method: "GET",
        headers: {
          data: session.user.sellerId,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data.items);
        })
        .catch((error) => {
          console.error("Failed to fetch items", error);
        });
    }
  }, [session?.user?.sellerId]);

  // const handleEdit = (itemId: any) => {
  //   router.push(`/editItem/?id=${itemId}`)
  // };

  return (
    <div>
      {items.map((item: any) => (
        <div
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5"
          key={item.name}
        >
          <div>
            <h2 className="font-bolt text-2xl">{item.name}</h2>
            {item.salePrice ? (<div>SalesPrice: {item.salePrice}€</div>) : null}
            <div>{item.price} €</div>
            <div>{item.description}</div>
          </div>

          <div className="flex gap-2 items-center">
            <RemoveBtn itemId={item._id} />
            <Link href={`/editItem/${encodeURIComponent(item._id)}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
