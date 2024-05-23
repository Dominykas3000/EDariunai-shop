"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export function DeleteReview({ reviewId }: { reviewId: string }) {
    const { data: session } = useSession();
    const isAdmin = session?.user?.privileges == "admin";

    const deleteReview = async (reviewId: string) => {
        console.log("reviewId", reviewId);
        if (confirm("Are you sure you want to delete this review?")) {

        const res = await fetch(`/api/item-review`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                data: reviewId,
            },
        });
        if (res.ok) {
            
            console.log("Review deleted");
            window.location.reload();
        } else {
            console.error("Failed to delete review", res);
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