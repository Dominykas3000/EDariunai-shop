export default function ProductPage({
  params,
}: {
  params: { productId: string; sellerId: string };
}) {
  return (
    <div>
      This is product: <span className="text-red-500 ">{params.sellerId}</span>{" "}
      of seller: <span className="text-red-500 ">{params.productId}</span>{" "}
    </div>
  );
}
