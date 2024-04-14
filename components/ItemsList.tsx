import Link from "next/link";
import RemoveBtn from "./ui/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import Item from "@/models/item";

const getItems = async () => {
  try {
    fetch(`http://localhost:3000/api/item`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log("--------------------------------------------------------------------")
        return data;
      });
  } catch (error) {
    console.error(error);
  }
};

export default async function ItemsList() {
  const items = await getItems();

  return (
    <div>
      {items.map((item: any) => (
        <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5">
          <div>
            <h2 className="font-bolt text-2xl">{item.name}</h2>
            // @ts-ignore
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
