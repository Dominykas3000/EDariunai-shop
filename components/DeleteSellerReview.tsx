"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function DeleteSellerReview({ reviewId }: { reviewId: string }) {
    const { data: session } = useSession();
    const isAdmin = session?.user?.privileges == "admin";

    const deleteReview = async (reviewId: string) => {
        console.log("reviewId", reviewId);
        if (confirm("Are you sure you want to delete this review?")) {

        const res = await fetch(`/api/seller-review`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                data: reviewId,
            },
        });
        if (res.ok) {
            
            toast("Review deleted");
            window.location.reload();
        } else {
            toast("Failed to delete review");
        }
    }
    };

  return (
    isAdmin ? (
    <Button
      onClick={() => {
        deleteReview(reviewId);
      }}
    >
      Delete
    </Button>) : null

  );
}