import { connectToDatabase } from "@/utils/database";
import mongoose, { Schema, model, models } from "mongoose";

connectToDatabase();

const ItemSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  tags: {
    type: [String],
    required: [true, "Tags are required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
  },
  image: {
    type: String,
  },
  salePrice: {
    type: Number,
  },
  saleStartDate: {
    type: Date,
  },
  saleEndDate: {
    type: Date,
  },
  saleActive: {
    type: Boolean,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: [true, "SellerId is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  timesVisited: {
    type: Number,
    default: 0,
  },
  wishlistCount: {
    type: Number,
    default: 0,
  },
  itemReviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "ItemReview",
    },
  ],
  negotiations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Negotiation",
    },
  ],
});

const Item = models.Item || model("Item", ItemSchema);

export default Item;
