import prisma from "@/app/libs/prismadb";

export interface CatParams {
    categoryId?: string;
}

export default async function getPostCategoryById(params: CatParams) {
    try {
        const { categoryId } = params;

        const postCategory = await prisma.postCategory.findUnique({
            where: {
                id: categoryId,
            },
        });
        if (!postCategory) {
            return null;
        }
        const safePostCategory = {
            ...postCategory,
            createdAt: postCategory?.createdAt?.toString(),
        };
        return safePostCategory;
    } catch (error: any) {
        throw new Error(error);
    }
}
