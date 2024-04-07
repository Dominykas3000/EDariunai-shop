import { connectToDatabase } from "@/app/utils/database";
import User from "@/models/user";
import { hash } from "bcrypt";

export default async function handler(req: any, res: any) {
  connectToDatabase().catch((error) =>
    res.json({ error: "Connection failed! " }),
  );

  console.log(req.method);

  if (req.method === "POST") {
    console.log("here")
    if (!req.body) return res.status(400).json({ error: "No data provided" });

    const { username, email, password } = req.body;
    const checkUser = await User.findOne({ email: email });
    if (checkUser)
      return res.status(422).json({ error: "User already exists" });

    User.create(
      { username, email, password: await hash(password, 10) },
      function (err: any, data: any) {
        if (err) {
          return res.status(404).json(err);
        }
        return res.status(201).json({ status: true, user: data });
      },
    );
  } else {
    res.status(500).json({ error: "Invalid request method" });
  }
}
