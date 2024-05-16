import { MongoClient } from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI;
let client: any = null;
let isConnected: boolean = false;

export async function connectToDatabase() {
  if (client) {
    return client;
  }

  if (isConnected) {
    return;
  }

  if (!MONGODB_URI) {
    console.log("MongoDb URI not found.");
    return;
  }

  try {
    client = await MongoClient.connect(MONGODB_URI);
    console.log("Connected to MongoDb successfully.");

    process.on("exit", async () => {
      if (client) {
        await client.close();
        console.log("MongoDb connection closed.");
      }
    });

    isConnected = true;
    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}
