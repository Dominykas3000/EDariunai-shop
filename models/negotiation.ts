import { connectToDatabase } from "@/utils/database";
import { Schema, model, models } from "mongoose";

connectToDatabase();

const NegotiationSchema = new Schema({
  negotiator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  newPrice: {
    type: Number,
    required: [true, "New price is required!"],
  },
  comment: {
    type: String,
    required: [true, "Comment is required!"],
  },
});

const Negotiation =
  models.Negotiation || model("Negotiation", NegotiationSchema);

export default Negotiation;
