import axios, { AxiosError } from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
            const response = await axios.post(`${process.env.BASE_URL}auth/login`, {
              email: credentials?.email,
              password: credentials?.password
            });
            return response.data.user

          } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error?.response?.data?.message;
                throw new Error(errorMessage)
              }
          }
          return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ user, token }) => {
      user && (token.user = user);
      return token;
    },
  },
};
