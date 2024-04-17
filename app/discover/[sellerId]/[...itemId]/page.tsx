export default function ProductPage({
  params,
}: {
  params: { itemId: string; sellerId: string };
}) {
  fetch(`/api/item`, {
    method: "GET",
    headers: {
      data: params.itemId,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
    });

  return (
    <div>
      This is item: <span className="text-red-500 ">{params.sellerId}</span>{" "}
      of seller: <span className="text-red-500 ">{params.itemId}</span>{" "}
    </div>
  );
}
