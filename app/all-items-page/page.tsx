import ItemFilter from "@/components/ItemFilter";
import ItemPageNation from "@/components/ItemPageNation";

export default function AllItemsPage({ searchParams }: any) {

  return (
    <>

      <ItemFilter searchParams={searchParams}></ItemFilter>
      <ItemPageNation searchParams={searchParams} ></ItemPageNation>

    </>
  );
}
