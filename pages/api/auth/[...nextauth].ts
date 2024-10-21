import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt"
import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid email or password!");
                }

                const admin = await prisma.admin.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!admin) {
                    throw new Error("User not found!");
                }

                if (!admin || !admin?.hashedPassword) {
                    throw new Error("Invalid email or password!");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    admin.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid email or password!");
                }
                return admin;
            },
        }),
    ],

    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
