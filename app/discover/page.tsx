"use client";

import { Button } from "@/components/ui/button";

export default function ShopCategories() {
  const buttonclicked = async () => {
    console.log("Button clicked");
  };
  return (
    <div>
      <Button onClick={buttonclicked} className=" bg-green-600 ">
        Click me
      </Button>
    </div>
  );
}
