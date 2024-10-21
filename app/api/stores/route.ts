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
        name,
        categories,
        slug,
        description,
        image,
        translateLink,
        coverImage,
        rating,
        votes,
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
        isTopRated,
    } = body;

    const store = await prisma.store.create({
        data: {
            locale,
            status,
            title,
            name,
            slug,
            description,
            image,
            translateLink,
            coverImage,
            rating: parseFloat(rating),
            votes: parseInt(votes),
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
            isTopRated,
            storeCategories: {
                connect:
                    categories.map((category: { id: string }) => ({
                        id: category.id,
                    })) || [],
            },
            userId: currentUser.id,
        },
    });

    return NextResponse.json(store);
}
