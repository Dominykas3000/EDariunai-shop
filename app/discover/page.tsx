"use client";

import { Button } from "@/components/ui/button";
import Item from "@/models/item";
import { connectToDatabase } from "@/utils/database";

export default function ShopCategories() {
  const buttonclicked = async () => {
    console.log("Button clicked");

  };
  return (
    <div>
      <Button onClick={buttonclicked} className=" bg-green-600 ">Click me</Button>
    </div>
  );
}
