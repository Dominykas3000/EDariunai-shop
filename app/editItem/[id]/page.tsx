import EditItemForm from "@/components/EditItemForm";

const getItemById = async ({ itemId }: { itemId: string }) => {
  try {
    const res = await fetch(`/api/item`, {
      cache: "no-store",
      method: "GET",
      headers: {
        data: itemId 
      }
    },
  );

    if (!res.ok) {
      throw new Error("Failed to fetch item");
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch item", error);
  }
};

export default async function EditItem({ params }: { params: { id: string } }) {
  console.log("params-------------", params);

  const { item } = await getItemById({ itemId: params.id });
  console.log("item-------------", item);
  const { name, price, description, tags, stock, category } = item;
  return (
    <EditItemForm
      id={params.id}
      name={name}
      price={price}
      description={description}
      tags={tags}
      stock={stock}
      category={category}
    />
  );
}
