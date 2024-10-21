import prisma from "@/app/libs/prismadb";

interface IParams {
    storeId?: string;
}

export default async function getStoreById(params: IParams) {
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
            createdAt: store?.createdAt?.toString(),
        };

        return safeStore;
    } catch (error: any) {
        throw new Error(error);
    }
}
