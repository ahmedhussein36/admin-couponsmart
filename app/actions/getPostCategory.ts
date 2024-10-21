import prisma from "@/app/libs/prismadb";

export interface IParams {
    name?: string;
    title?: string;
    status?: string;
    locale?: string;
}

export default async function getPostCategory(params: IParams) {
    try {
        const { name, title, status, locale } = params;

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
        if (locale) {
            query.locale = locale;
        }

        const storeCategories = await prisma.postCategory.findMany({
            where: query,
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
