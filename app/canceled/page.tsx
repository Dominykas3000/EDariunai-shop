// page for canceled stripe payment

import { Button } from "@/components/ui/button";

export default function Canceled() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-8xl font-semibold">Payment Canceled</h1>
      <p className="text-muted-foreground">
        Your payment has been canceled. You can try again by clicking the button
        below.
      </p>
      <Button>Try Again</Button>
    </div>
  );
}
