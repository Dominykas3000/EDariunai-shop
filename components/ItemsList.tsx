"use client";

import Link from "next/link";
import RemoveBtn from "./ui/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ItemsList() {
  const { data: session } = useSession();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`http://localhost:3000/api/seller/${session.user.id}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data.items);
        })
        .catch((error) => {
          console.error("Failed to fetch items", error);
        });
    }
  }, [session?.user?.id]);

  return (
    <div>
      {items.map((item: any) => (
        <div
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5"
          key={item.name}
        >
          <div>
            <h2 className="font-bolt text-2xl">{item.name}</h2>
            <div>{item.price}</div>
            <div>{item.description}</div>
          </div>

          <div className="flex gap-2 items-center">
            <RemoveBtn />
            <Link href={`/editItem/${item._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
