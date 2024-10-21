import prisma from "@/app/libs/prismadb";

export interface IParams {
    name?: string;
    title?: string;
    status?: string;
    locale?: string;
}

export default async function getStores(params: IParams) {
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

        const stores = await prisma.store.findMany({
            where: query,
            select: {
                id: true,
                name: true,
                locale: true,
                title: true,
                status: true,
                auther: true,
                coupons: {
                    select: {
                        id: true,
                    },
                },
                storeCategories: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },

            orderBy: {
                createdAt: "asc",
            },
        });

        const safeStore = stores.map((safeStore) => ({
            ...safeStore,
        }));

        return safeStore;
    } catch (error: any) {
        throw new Error(error);
    }
}
