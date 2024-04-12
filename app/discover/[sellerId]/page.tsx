export default function functionSellerShop({
  params,
}: {
  params: { sellerId: string };
}) {
  return (
    <div>
      This is shop of seller:{" "}
      <span className="text-red-500 ">{params.sellerId}</span>
    </div>
  );
}
