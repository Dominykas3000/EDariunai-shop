import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
    match: [
      /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9ĄČĘĖĮŠŲŪąčęėįšųū._]+(?<![_.])$/,
      "Username invalid, it should contain 5-20 alphanumeric letters and be unique!",
    ],
  },
   password: {
     type: String,
     required: [true, "Password is required!"],
     match: [
       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
       "Password invalid, it should contain at least 8 characters, one uppercase letter, one lowercase letter and one number!",
     ],
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
