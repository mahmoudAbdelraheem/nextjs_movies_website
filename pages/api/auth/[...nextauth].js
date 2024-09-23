import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
    }),
  ],
});
