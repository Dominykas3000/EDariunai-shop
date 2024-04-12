import React from "react";

const ProductPage = ({ params }: { params: { productId: string } }) => {

  return <div>This is product of seller: {params.productId} </div>;
};

export default ProductPage;
