import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const OPTIONS = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        let { email, password } = credentials;
        let user = {
          email: "example@example.com",
          password: "hello123",
        };
        if (user.email === email && user.password === password) {
          return user as any;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    error: "/",
  },

  callback: {
    async session({ session, token }: any) {
      return session;
    },
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
