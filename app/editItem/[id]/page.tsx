import EditItemForm from "@/components/EditItemForm";
import Item from "@/models/item";

const getItemById = async ({ itemId }: { itemId: string }) => {
  try {
    const item = await Item.findById(itemId);

    return item;
  } catch (error) {
    console.error("Failed to fetch item", error);
  }
};

export default async function EditItem({ params }: { params: { id: string } }) {

  const item  = await getItemById({ itemId: params.id });
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
