import prisma from "@/app/libs/prismadb";

export interface UserParams {
    name?: string;
    email?: string;
    role?: string;
    status?: string;
    username?: string;
}

export default async function getUsers(params: UserParams) {
    try {
        const { name, email, role, status, username } = params;

        let query: any = {};

        if (name) {
            query.name = {
                contains: name,
            };
        }
        if (email) {
            query.email = email;
        }

        if (role) {
            query.role = role;
        }

        if (status) {
            query.status = status;
        }
        if (username) {
            query.username = username;
        }

        const admins = await prisma.admin.findMany({
            where: query,
            orderBy: {
                createdAt: "asc",
            },
        });

        const safeusers = admins.map((user) => ({
            ...user,
            createdAt: user.createdAt.toISOString(),
        }));

        return safeusers;
    } catch (error: any) {
        throw new Error(error);
    }
}
