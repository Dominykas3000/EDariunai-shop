// 'use client';
// import { useState, useEffect } from 'react';
// import ProductCard from '@/components/ProductCard';

import SellerPageNation from "@/components/SellerPageNation";

// export default function SellersPage() {
//   const [sellers, setSellers] = useState([]);

//   useEffect(() => {
//     fetch('/api/all-sellers')
//       .then(response => response.json())
//       .then(data => setSellers(data));
//   }, []);

// return (
//     <div>
//         <h1>Stores</h1>
//         {sellers.map((seller: { id: string, name: string, description: string }) => (
//             <div key={seller.id}>
//                 <h2>{seller.name}</h2>
//                 <p>{seller.description}</p>
//             </div>
//         ))}
//     </div>
// );
// }


export default function AllItemsPage({ searchParams }: any) {

    return (
        <>

            {/* <ItemFilter searchParams={searchParams}></ItemFilter> */}
            <SellerPageNation searchParams={searchParams} ></SellerPageNation>

        </>
    );
}
