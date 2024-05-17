import { connectToDatabase } from "@/utils/database";
import  { Schema, model, models } from "mongoose";

connectToDatabase();

const SellerReviewSchema = new Schema({
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  rating: {
    type: Number,
    required: [true, "Rating is required!"],
  },
  review: {
    type: String,
    required: [true, "Review is required!"],
  },
});

const SellerReview =
  models.SellerReview || model("SellerReview", SellerReviewSchema);

export default SellerReview;
