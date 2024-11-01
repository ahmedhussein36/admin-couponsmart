import prisma from "@/app/libs/prismadb";

export interface StoreParam {
    storeId?: string;
}

export default async function getStoreById(params: StoreParam) {
    try {
        const { storeId } = params;

        const store = await prisma.store.findUnique({
            where: {
                id: storeId,
            },
            include: {
                storeCategories: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });

        if (!store) {
            return null;
        }

        const safeStore = {
            ...store,
            createdAt: store?.createdAt?.toLocaleString(),
        };

        return safeStore;
    } catch (error: any) {
        throw new Error(error);
    }
}
