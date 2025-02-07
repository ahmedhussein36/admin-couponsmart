import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    postId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const { postId } = params;
    if (!postId || typeof postId !== "string") {
        throw new Error("Invalid ID");
    }
    const post = await prisma.post.delete({
        where: {
            id: postId,
        },
    });

    return NextResponse.json(post);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const {
        locale,
        status,
        title,
        description,
        image,
        faqs,
        translateLink,
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogImage,
        ogTitle,
        ogDescription,
        ogUrl,
        isFeatured,
        isRecommended,
        isFooter,
        isAddHome,
        categories,
        tags,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const { postId } = params;
    if (!postId || typeof postId !== "string") {
        throw new Error("Invalid ID");
    }
    const post = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            locale,
            status,
            title,
            description,
            image,
            faqs,
            translateLink,
            metaTitle,
            metaDescription,
            canonicalUrl,
            ogImage,
            ogTitle,
            ogDescription,
            ogUrl,
            isFeatured,
            isRecommended,
            isFooter,
            isAddHome,
        },
    });

    // Connect post categories separately
    await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            PostCategory: {
                set: categories.map((category: { id: string }) => ({
                    id: category,
                })),
            },
            Tags: {
                connectOrCreate:
                    tags.map((tagId: string) => ({
                        id: tagId,
                    })) || [],
            },
        },
    });

    return NextResponse.json(post);
}
