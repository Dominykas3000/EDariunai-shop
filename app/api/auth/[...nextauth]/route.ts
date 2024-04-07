import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { connectToDatabase } from "@/app/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // ...add more providers here
  ],

  // secret: process.env.JWT_SECRET,

  // callbacks: {
  //   async session({ session }: { session: any }) {
  //     const sessionUser = await User.findOne({ email: session.user?.email });
  //     if (sessionUser) {
  //       session.user.id = sessionUser._id.toString() ?? "";
  //     }
  //     return session;
  //   },
  //   // @ts-ignore
  //   async signIn({ user, account }: { user: any; account: any }) {
  //     if (account.provider == "google" || account.provider == "github") {
  //       try {
  //         await connectToDatabase();
  //         const userExists = await User.findOne({ email: user.email });

  //         if (!userExists) {
  //           await User.create({
  //             email: user.email,
  //             username: user.name.replace(" ", ""),
  //             image: user.image,
  //             isAdmin: false,
  //             isSeller: false,
  //           });
  //         }

  //         return true;
  //       } catch (error) {
  //         console.error(error);
  //         return false;
  //       }
  //     }
  //   },
  // },
});

export { handler as GET, handler as POST };
