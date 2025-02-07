import prisma from "@/app/libs/prismadb";

export interface PostParams {
    postId?: string;
}

export default async function getPostById(params: PostParams) {
    try {
        const { postId } = params;

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            include: {
                PostCategory: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                Tags: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });

        if (!post) {
            return null;
        }

        const safePost = {
            ...post,
            createdAt: post?.createdAt?.toISOString(),
        };

        return safePost;
    } catch (error: any) {
        throw new Error(error);
    }
}
