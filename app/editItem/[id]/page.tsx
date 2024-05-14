import EditItemForm from "@/components/EditItemForm";
import FormSection from "@/components/FormSection";
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

  const item = await getItemById({ itemId: params.id });
  const { name, price, description, tags, stock, category, image } = item;
  return (
    <>
      <h2 className="lg:text-3xl sm:text-2xl text-center pb-4">
        Update your product  <i>{name}</i> !
      </h2>
      <FormSection>
        <EditItemForm
          id={params.id}
          name={name}
          price={price}
          description={description}
          tags={tags}
          stock={stock}
          category={category}
          image={image}
        />
      </FormSection >
    </>
  );
}
