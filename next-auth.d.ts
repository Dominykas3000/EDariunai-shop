// next-auth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      role: "buyer" | "seller";
      sellerId?: string;
      privileges: any;
    } & DefaultSession["user"];
  }
}