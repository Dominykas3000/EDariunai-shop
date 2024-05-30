"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface QueryObject {
  [key: string]: string[];
}

interface Order {
  [key: string]: string;
}

export default function Success() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  const parseQueryString = (query: string): QueryObject => {
    const params = new URLSearchParams(query);
    const entries = Array.from(params.entries());
    const queryObject: QueryObject = {};
    entries.forEach(([key, value]) => {
      if (!queryObject[key]) {
        queryObject[key] = [];
      }
      queryObject[key].push(value);
    });
    return queryObject;
  };

  const processQueryObject = (query: QueryObject): Order[] => {
    const ordersArray: Order[] = [];
    const keys = Object.keys(query);
    const buyerIdKey = keys.find(key => key.toLowerCase().includes('buyer_id')) || 'buyer_id'; 
    const numberOfOrders = query[keys.find(key => key !== buyerIdKey) || keys[0]].length; 

    for (let i = 0; i < numberOfOrders; i++) {
      const order: Order = {};
      keys.forEach((key) => {
        order[key] = query[key][i];
      });
      if (!order[buyerIdKey] && i > 0) {
        order[buyerIdKey] = query[buyerIdKey][0];
      }
      ordersArray.push(order);
    }

    return ordersArray;
  };

 
    const parsedQueryObject = parseQueryString(queryString);
    const orders = processQueryObject(parsedQueryObject);

    console.log("orders:", orders);

    if (orders.length > 0) {
      fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orders }),
      }).catch((error) => {
        console.error("Failed to send orders:", error);
      });
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-8xl font-semibold">Payment success</h1>
      <p className="text-muted-foreground">
        Your payment has been successful.
      </p>
    </div>
  );
}