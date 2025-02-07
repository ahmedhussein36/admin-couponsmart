import prisma from "@/app/libs/prismadb";

export interface STParams {
    categoryId?: string;
}

export default async function getStoreCategoryById(params: STParams) {
    try {
        const { categoryId } = params;

        const storeCategory = await prisma.storeCategory.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (!storeCategory) {
            return null;
        }

        const safeStoreCategory = {
            ...storeCategory,
            createdAt: storeCategory?.createdAt?.toString(),
        };

        return safeStoreCategory;
    } catch (error: any) {
        throw new Error(error);
    }
}
