import { connectToDatabase } from "@/utils/database";
import { Schema, model, models } from "mongoose";

connectToDatabase();

const ItemReviewSchema = new Schema({
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
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

const ItemReview = models.ItemReview || model("ItemReview", ItemReviewSchema);

export default ItemReview;
