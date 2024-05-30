'use client';
import NegotiationOverView from '@/components/NegotiationOverView';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const spinner = (<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25" /><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>);

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

      {
        loading &&
        <div className='w-full flex justify-center text-center mt-20 text-3xl font-bold'>
          {spinner}
        </div>
      }

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