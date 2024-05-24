import { connectToDatabase } from "@/utils/database";
import mongoose, { Schema, model, models } from "mongoose";

connectToDatabase();

const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },

  privileges: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  role: {
    type: String,
    enum: ["buyer", "seller"],
    default: "buyer",
  },

  wishlist: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    default: [],
  },

  phoneNumber: {
    type: String,
  },

  image: {
    type: String,
  },

  frozen: {
    type: Boolean,
    default: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
