import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/utils/database";
import { compare } from "bcryptjs";
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
    CredentialsProvider({
      name: "Credentials",
      credentials: {

        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          return null;
        }
        const checkPassword = await compare(
          credentials.password,
          user.password,
        );
        
        if (!checkPassword || user.email !== credentials.email) {
          console.warn("Invalid credentials");
          throw new Error("Invalid credentials");
        }
        
        console.log("credentials: ", credentials);
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
        session.user.isAdmin = sessionUser.isAdmin ?? false;
        session.user.isSeller = sessionUser.isSeller ?? false;
        session.user.image = sessionUser.image ?? "";
      }
      console.log("session : ", session);
      return session;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider == "google" || account.provider == "github") {
        try {
          await connectToDatabase();
          const userExists = await User.findOne({ email: user.email });

          if (!userExists) {
            await User.create({
              email: user.email,
              username: user.name.replace(" ", "").replace(".", ""),
              image: user.image,
              isAdmin: false,
              isSeller: false,
            });
          }

          return user;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return true; 
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
