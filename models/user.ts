import mongoose, { Schema, model, models } from "mongoose";

const mongoUri: string = process.env.MONGODB_URI || "";
mongoose.connect(mongoUri, {
  dbName: process.env.DBNAME,
});

const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9ĄČĘĖĮŠŲŪąčęėįšųū._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
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

  phoneNumber: {
    type: String,
  },

  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
