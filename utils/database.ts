import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  console.log("connecting to database");
  if (isConnected) {
    console.log("using existing connection");
    return;
  }

  console.log("using new connection");

  try {
    const mongoUri: string = process.env.MONGODB_URI || "";
    await mongoose.connect(mongoUri, {
      dbName: process.env.dbName,
    });

    isConnected = true;

    console.log("connected to database");
  } catch (error) {
    console.error("error connecting to database");
    console.error(error);
  }
};
