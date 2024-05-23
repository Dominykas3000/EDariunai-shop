import { connectToDatabase } from "@/utils/database";
import mongoose, { Schema, model, models } from "mongoose";

connectToDatabase();

const SellerSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: [true, "Store name is required!"],
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
  },
  storeItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  sellerReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "SellerReview",
    },
  ],
  flagged: {
    type: Boolean,
    default: false,
  },
});

const Seller = models.Seller || model("Seller", SellerSchema);

export default Seller;
