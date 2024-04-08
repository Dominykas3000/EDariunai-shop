import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/app/utils/database";
import UserSchema from "@/models/user";
import bcrypt from "bcryptjs";

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
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        console.log("credentials");
        try {
          await connectToDatabase();
          const user = await UserSchema.findOne({ email: credentials?.email });
          console.log("DIDWEFINDAUSER", user);
          const passwordsMatch = await bcrypt.compare(
            credentials?.password ?? "",
            user.password,
          );
          console.log("DIDPASSWORDSMATCH", passwordsMatch);
          if (user && passwordsMatch) {
            console.log("user pavyko returninm", user);
            return user;
          }
          return null;
        } catch (error) {
          console.error("errorauthroute", error);
          return null;
        }
      }
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session }: { session: any }) {
      console.log("sessdsfsdfsdfsion", session);
      const sessionUser = await UserSchema.findOne({ email: session.user?.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString() ?? "";
      }
      return session;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider == "google" || account.provider == "github") {
        try {
          await connectToDatabase();
          const userExists = await UserSchema.findOne({ email: user.email });
          
          if (!userExists) {
            await UserSchema.create({
              email: user.email,
              username: user.name.replace(" ", "").replace(".", ""), // cia biski approacho kito reikia
              image: user.image,
              isAdmin: false,
              isSeller: false,
            });
          }

          return true;
        } catch (error) {
          console.error("error", error);
          return false;
        }
      }
      return false; // if neither google nor github (neither credentials in the future)
    }
  },
  pages: {
    signIn: "/authorization",
  },
  session: {
    strategy: "jwt",
  }
});

export { handler as GET, handler as POST };
