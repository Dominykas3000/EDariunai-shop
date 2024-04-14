export default function ProductPage({
  params,
}: {
  params: { itemId: string; sellerId: string };
}) {
  fetch(`http://localhost:3000/api/item/${params.itemId}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

  return (
    <div>
      This is item: <span className="text-red-500 ">{params.sellerId}</span>{" "}
      of seller: <span className="text-red-500 ">{params.itemId}</span>{" "}
    </div>
  );
}
