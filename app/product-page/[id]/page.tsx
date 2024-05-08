import ProductHeader from "@/components/ProductHeader";
import Item from "@/models/item";

const getItemById = async ({ itemId }: { itemId: string }) => {
  try {
    console.log("itemid", itemId)
    const item = await Item.findById(itemId).populate('sellerId');

    return JSON.stringify(item);
  } catch (error) {
    console.error("Failed to fetch item", error);
  }
};

export default async function ItemPage({ params }: { params: { id: string } }) {

  const item = await getItemById({ itemId: params.id })

  return (
    <>
    {item ? <ProductHeader product={JSON.parse(item)} /> : <span>no data</span>}
    </>

  );

}