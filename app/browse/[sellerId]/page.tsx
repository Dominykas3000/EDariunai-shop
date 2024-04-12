import React from "react";

const SellerShop = ({ params }: { params: { sellerId: string } }) => {

  return <div>This is shop of seller: {params.sellerId} </div>;
};

export default SellerShop;
