import { IUser } from "../../../types/userType";
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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}auth/login`, {
              email: credentials?.email,
              password: credentials?.password
            });

            console.log(response.data.user)
            return {
              ...response.data.user,
              accessToken: response.data.token
            }

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
    error: "/login",
    signOut: "/login"
  },
  callbacks: {
    jwt: async ({token, user}) => {
      user && (token.user = user)
      return token
    },
    session: async({session, token}) => {
      const user = token.user as IUser
      return { ...session,
        user: { ...session.user,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        }
      }
    }
  }
  
};
