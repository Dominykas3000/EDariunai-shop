export default function functionSellerShop({
  params,
}: {
  params: { sellerId: string };
}) {
  fetch(`http://localhost:3000/api/seller/${params.sellerId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
    });

  return (
    <div>
      This is shop of seller:{" "}
      <span className="text-red-500 ">{params.sellerId}</span>
    </div>
  );
}
