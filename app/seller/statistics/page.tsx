"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
interface Item {
  name: string;
  timesVisited: number;
}

const StatisticsPage = () => {
  const { data: session } = useSession();
  const [items, setItems] = useState([]);
  const [totalViewed, setTotalViewed] = useState(0);
  const [bestPerformer, setBestPerformer] = useState<Item | null>(null);
  useEffect(() => {
    if (session?.user?.sellerId) {
      fetch(`/api/seller`, {
        method: "GET",
        headers: {
          data: session.user.sellerId,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data.items);
          calculateTotalViewed(data.items);
          calculateBestPerformer(data.items);
        })
        .catch((error) => {
          console.error("Failed to fetch items", error);
        });
    }
  }, [session?.user?.sellerId]);

  const calculateTotalViewed = (items: any) => {
    const total = items.reduce((acc: any, item: any) => acc + item.timesVisited, 0);
    setTotalViewed(total);
  };

  const calculateBestPerformer = (items: any) => {
    let maxViews = 0;
    let bestItem = null;

    items.forEach((item: any) => {
      if (item.timesVisited > maxViews) {
        maxViews = item.timesVisited;
        bestItem = item;
      }
    });

    setBestPerformer(bestItem);
  };

  return (
    <>
      <div className='justify-center flex mt-20'>
        <h1 className="text-3xl font-bold">Statistics</h1>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold">Overall Statistics</h2>
        <div>Total Viewed: <b>{totalViewed}</b> times</div>
        {bestPerformer ? (
          <div>
            Best Performer: <b>{bestPerformer.name}</b> with {bestPerformer.timesVisited} views
          </div>
        ) : (
          <div>No best performer found</div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-20" >
        {
          items.map((item: any) => (
            <div
              className="p-4 border border-slate-300 my-3 flex flex-col justify-between gap-5"
              key={item.name}
            >
              <div>
                <h2 className="font-bold text-2xl">{item.name}</h2>
                <div>{item.price} €</div>
                <div>{item.description}</div>
              </div>

              <div className="flex gap-2 items-start flex-col">
                <div>Sold: <b>X</b> times</div>
                <div>Viewed: <b>{item.timesVisited}</b> times</div>
                <div>Wishlist: <b>{item.wishlistCount}</b> times</div>
              </div>
            </div>
          ))
        }
      </div >

    </>
  );
};

export default StatisticsPage;
