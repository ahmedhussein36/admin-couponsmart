import prisma from "@/app/libs/prismadb";

export interface IParams {
    name?: string;
    title?: string;
    status?: string;
    locale?: string;
}

export default async function getPosts(params: IParams) {
    try {
        const { title, status, locale } = params;

        let query: any = {};
        if (title) {
            query.title = { contains: title };
        }
        if (status) {
            query.status = status;
        }
        if (locale) {
            query.locale = locale;
        }

        const posts = await prisma.post.findMany({
            where: query,
            select: {
                id: true,
                createdAt: true,
                locale: true,
                title: true,
                status: true,
                PostCategory: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                author: {
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

        const safePost = posts.map((safePost) => ({
            ...safePost,
            createdAt: safePost.createdAt.toISOString(),
        }));

        return safePost;
    } catch (error: any) {
        throw new Error(error);
    }
}
