"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

type order = {
  _id: string;
  itemid: string;
  buyerid: string;
  quantity: number;
  sellerid: string;
};

export default function Component() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    const userid = session?.user?.id || "";

    if (userid) {
      fetch(`/api/orders`, {
        method: "GET",
        headers: {
          buyer: userid,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data orders", data);
          setOrders(data.orders);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [session?.user?.id]); // Dependency array, it only reruns if session changes

  return (
    <Card className="mt-8">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Buyer ID</TableHead>
              <TableHead className="hidden sm:table-cell">Item ID</TableHead>
              <TableHead className="hidden sm:table-cell">Seller ID</TableHead>
              <TableHead className="hidden md:table-cell">quantity</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order: order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {order.buyerid}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {order.itemid}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {order.sellerid}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {order.quantity}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  Awaiting payment confirmation
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}