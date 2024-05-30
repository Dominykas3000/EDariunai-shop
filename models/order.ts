import { connectToDatabase } from "@/utils/database";
import mongoose, { Schema, model, models } from "mongoose";

connectToDatabase();

const OrderSchema = new Schema({
  buyerid: {
    type: String,
    required: [true, "Buyer id is required"],
  },
  quantity: {
    type: String,
    required: [true, "quantity is required"],
  },
  itemid: {
    type: String,
    required: [true, "Item id is required"],
  },
  sellerid : {
    type: String,
    required: [true, "Seller id is required"],
  }
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;
