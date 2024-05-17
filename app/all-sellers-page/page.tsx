import SellerPageNation from "@/components/SellerPageNation";

export default function AllItemsPage({ searchParams }: any) {

    return (
        <>

            {/* <ItemFilter searchParams={searchParams}></ItemFilter> */}
            <SellerPageNation searchParams={searchParams} ></SellerPageNation>

        </>
    );
}
