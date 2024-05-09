import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import User from "@/models/user";
import Seller from "@/models/seller";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("User not found!");
        }
        const checkPassword = await compare(
          credentials.password,
          user.password
        );

        if (!checkPassword || user.email !== credentials.email) {
          throw new Error("Invalid email or password!");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }: { session: any }) {
      const sessionUser = await User.findOne({ email: session.user?.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString() ?? "";
        session.user.name = sessionUser.username ?? "";
        session.user.privileges = sessionUser.privileges ?? "user";
        session.user.role = sessionUser.role ?? "buyer";
        session.user.image = sessionUser.image ?? "";
        if (sessionUser.role === "seller") {
          const sellerUser = await Seller.findOne({ creator: sessionUser._id });
          session.user.sellerId = sellerUser?._id.toHexString() ?? "";
        }
      }
      // console.log("sessionas api/nextauth route\n", session);
      return session;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider == "google" || account.provider == "github") {
        try {
          const userExists = await User.findOne({ email: user.email });

          if (!userExists) {
            await User.create({
              email: user.email,
              username: user.name.replace(" ", "").replace(".", ""),
              image: user.image,
              privileges: "user",
              role: "buyer",
            });
          }

          return user;
        } catch (error) {
          console.error(error);
          return false;
        }
      } else if (account.provider == "credentials") {
        return true;
      }
      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/authorization",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
