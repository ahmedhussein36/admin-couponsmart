import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    categoryId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const { categoryId } = params;
    if (!categoryId || typeof categoryId !== "string") {
        throw new Error("Invalid ID");
    }
    const store = await prisma.store.delete({
        where: {
            id: categoryId,
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
        description,
        translateLink,
        image,
        faqs,
        coverImage,
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogImage,
        ogTitle,
        ogDescription,
        ogUrl,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const { categoryId } = params;
    if (!categoryId || typeof categoryId !== "string") {
        throw new Error("Invalid ID");
    }
    // Update the store's scalar fields
    const store = await prisma.storeCategory.update({
        where: {
            id: categoryId,
        },
        data: {
            locale,
            status,
            title,
            name,
            description,
            translateLink,
            image,
            coverImage,
            faqs,
            metaTitle,
            metaDescription,
            canonicalUrl,
            ogImage,
            ogTitle,
            ogDescription,
            ogUrl,
        },
    });

    return NextResponse.json(store);
}
