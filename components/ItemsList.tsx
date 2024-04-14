import Link from "next/link";
import RemoveBtn from "./ui/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Item from "@/models/item";

const getItems = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/item`, {
        method: "GET",
      });
      const data = await response.json();
    //   console.log(data.message.items)
    //   console.log("-----------------------------")
      return data.message.items; 
    } catch (error) {
      console.error(error);
      return []; 
    }
  };

export default async function ItemsList() {
  const items = await getItems();
  console.log(items);

  return (
    <div>
      {items.map((item: any) => (
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5">
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
