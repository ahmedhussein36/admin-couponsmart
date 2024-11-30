import prisma from "@/app/libs/prismadb";

export interface IParams {
    name?: string;
    title?: string;
    status?: string;
}

export default async function getStoreCategories(params: IParams) {
    try {
        const { name, title, status } = params;

        let query: any = {};

        if (name) {
            query.name = {
                contains: name,
            };
        }
        if (title) {
            query.title = title;
        }
        if (status) {
            query.status = status;
        }

        const storeCategories = await prisma.storeCategory.findMany({
            where: query,
            include: {
                coupons: true,
                auther: true,
            },

            orderBy: {
                createdAt: "asc",
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
