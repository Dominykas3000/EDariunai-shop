import mongoose from "mongoose";
import { logger } from "./helpers";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    const mongoUri: string = process.env.MONGODB_URI || "";
    await mongoose.connect(mongoUri, {
      dbName: process.env.DBNAME,
    });

    isConnected = true;
  } catch (error) {
    logger.error(`Error details: ${error}`);
  }
};
