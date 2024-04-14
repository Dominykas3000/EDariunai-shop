export default function ProductPage({
  params,
}: {
  params: { productId: string; sellerId: string };
}) {
  fetch(`http://localhost:3000/api/product/${params.productId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

  return (
    <div>
      This is product: <span className="text-red-500 ">{params.sellerId}</span>{" "}
      of seller: <span className="text-red-500 ">{params.productId}</span>{" "}
    </div>
  );
}
