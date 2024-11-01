import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    storeId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const { storeId } = params;
    if (!storeId || typeof storeId !== "string") {
        throw new Error("Invalid ID");
    }
    const store = await prisma.store.delete({
        where: {
            id: storeId,
        },
    });

    return NextResponse.json(store);
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
        name,
        categories,
        affiliateUrl,
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

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const { storeId } = params;
    if (!storeId || typeof storeId !== "string") {
        throw new Error("Invalid ID");
    }
    // Update the store's scalar fields
    const store = await prisma.store.update({
        where: {
            id: storeId,
        },
        data: {
            locale,
            status,
            title,
            name,
            affiliateUrl,
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
        },
    });

    // Connect store categories separately
    await prisma.store.update({
        where: {
            id: storeId,
        },
        data: {
            storeCategories: {
                connect: categories.map((category: { id: string }) => ({
                    id: category.id,
                })),
            },
        },
    });

    return NextResponse.json(store);
}
