import prisma from "@/app/libs/prismadb";

export default async function getPostCategory() {
    try {
        const storeCategories = await prisma.postCategory.findMany({
            select: {
                id: true,
                name: true,
                title: true,
                locale: true,
                status: true,
                createdAt: true,
                posts: {
                    select: {
                        id: true,
                    },
                },
            },

            orderBy: {
                createdAt: "desc",
            },
        });

        const safeCategory = storeCategories.map((safeCategory) => ({
            ...safeCategory,
            createdAt: safeCategory.createdAt.toISOString(),
        }));

        return safeCategory;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getPublishPostCategories() {
    try {
        const storeCategories = await prisma.postCategory.findMany({
            where: {
                status: "published",
            },
            select: {
                id: true,
                title: true,
                locale: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const safeCategory = storeCategories.map((safeCategory) => ({
            ...safeCategory,
        }));

        return safeCategory;
    } catch (error: any) {
        throw new Error(error);
    }
}
