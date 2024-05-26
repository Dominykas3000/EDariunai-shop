'use client';
import NegotiationOverView from '@/components/NegotiationOverView';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const NegotiationsPage = () => {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (session?.user?.sellerId) {

      fetch(`/api/item-negotiation`, {
        method: "GET",
        headers: {
          data: session.user.sellerId,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data.items);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch items", error);
        });
    }
  }, [session?.user?.sellerId]);

  const noNegotiations = items.every((item: any) => !item.negotiations || item.negotiations.length === 0);

  return (
    <section>
      <h1 className="w-full text-center text-3xl font-bold mt-8">
        Checkout users trying to negotiate your product prices!
      </h1>

      {loading && <h4 className='w-full text-center mt-20 text-3xl font-bold'>Loading...</h4>}

      {noNegotiations && !loading && (
        <div className="w-full text-center mt-8 text-2xl font-bold">
          No negotiations available
        </div>
      )}

      <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {items.map((item: any) => {
          if (!item.negotiations || item.negotiations.length === 0) {
            return null;
          }
          return (
            <div
              className="p-4 border border-slate-300 my-3 flex justify-between gap-5"
              key={item.name}
            >
              <div className='flex  flex-col gap-2'>
                <h2 className="font-bold text-2xl">{item.name}</h2>
                <div><b>Price: </b>{item.price} €</div>
                <div><b>Description: </b> {item.description}</div>
                <NegotiationOverView product={item} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default NegotiationsPage