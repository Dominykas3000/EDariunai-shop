import mongoose, { Schema, model, models } from "mongoose";

const mongoUri: string = process.env.MONGODB_URI || "";
mongoose.connect(mongoUri, {
  dbName: process.env.DBNAME,
});

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
  storeItems: {
    ref: "Item",
    type: Array,
    default: [],
  },
});

const Seller = models.Seller || model("Seller", SellerSchema);

export default Seller;
