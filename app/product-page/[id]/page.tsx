import ProductHeader from "@/components/ProductHeader";
import Item from "@/models/item";

const getItemById = async ({ itemId }: { itemId: string }) => {
  try {
    const item = await Item.findById(itemId).populate('sellerId');

    return item;
  } catch (error) {
    console.error("Failed to fetch item", error);
  }
};

export default async function ItemPage({ params }: { params: { id: string } }) {

  const item = await getItemById({ itemId: params.id })


  return (
    <>
      <ProductHeader product={item} />
    </>

  );

}