"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";

import { ScrollArea } from "../ui/scroll-area";
import { useCart } from "@/context/CartContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSession } from 'next-auth/react';



export function formatPrice(price: number): string {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "EUR",
  });
}

export function CartItemActions({ item }: any) {
  const { updateCartItemQuantity, removeFromCart } = useCart();
  console.log(item);
  const handleQuantityChange = (qty: number) => {
    const quantity = Number(qty);
    if (quantity >= 1) {
      updateCartItemQuantity(item.product._id, qty, item.product.stock);
    }
  };

  const handleRemoveClick = () => {
    removeFromCart(item.product._id);
  };

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            handleQuantityChange(item.quantity - 1);
          }}
        >
          -
        </Button>
      </div>
      <Input
        className="h-8 w-14 text-xs"
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) => {
          handleQuantityChange(Number(e.target.value));
        }}
      />
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          handleQuantityChange(item.quantity + 1);
        }}
      >
        +
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={handleRemoveClick}
      >
        <TrashIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

function CartItem({ item }: { item: any }) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative h-16 w-16 overflow-hidden rounded">
        <img src={item.product.image} />
      </div>
      <div className="flex flex-1 flex-col gap-1 self-start text-sm">
        <span className="line-clamp-1">{item.product.title}</span>
        <span className="line-clamp-1 text-muted-foreground">
          {formatPrice(item.product.price)} x {item.quantity} ={" "}
          {formatPrice(item.product.price * item.quantity)}
        </span>
        <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
          {item.product.category}
        </span>
      </div>
      <CartItemActions item={item} />
    </div>
  );
}

export default function CartSidebar() {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const { data: session } = useSession();
  const buyer_id = session?.user?.id;

  const handleCheckout = () => {
    fetch("/api/checkoutsession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartItems, buyer_id: buyer_id}),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("dayareturned", data);

        window.location.href = data.checkoutUrl;
      });
  };

  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        {itemCount > 0 && (
          <div className="flex flex-1 flex-col gap-5 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-5 pr-6">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="space-y-3">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        {buyer_id ? (
        <Button variant="default" size="sm" onClick={handleCheckout}>
          Checkout
        </Button>
        ) : (
          <span className="text-muted-foreground">Please log in to checkout</span>
        )}
      </SheetContent>
    </Sheet>
  );
}
