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
                image: true,
                locale: true,
                title: true,
                status: true,
                author: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
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
                createdAt: "desc",
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

export const getAllStores = async () => {
    const stores = await prisma.store.findMany();

    const allStores = stores.map((store) => {
        return store.name;
    });
    return allStores;
};
