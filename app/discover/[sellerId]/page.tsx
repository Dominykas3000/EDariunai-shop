export default function functionSellerShop({
  params,
}: {
  params: { sellerId: string };
}) {
  fetch(`/api/seller`, {
    method: "GET",
    headers: {
      data: params.sellerId,
    },
  })
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
