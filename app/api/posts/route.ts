import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return new Response("Unauthorized", { status: 401 });
    }
    const body = await request.json();
    const {
        locale,
        status,
        title,
        slug,
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

    const post = await prisma.post.create({
        data: {
            locale,
            status,
            title,
            slug,
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
            PostCategory: {
                connect:
                    categories.map((category: { id: string }) => ({
                        id: category,
                    })) || [],
            },
            Tags: {
                connectOrCreate:
                    tags.map((tag: { id: string }) => ({
                        id: tag.id,
                    })) || [],
            },
            userId: currentUser.id,
        },
    });

    return NextResponse.json(post);
}
