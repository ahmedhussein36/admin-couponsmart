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
        slug,
        faqs,
        description,
        image,
        translateLink,
        coverImage,
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogImage,
        ogTitle,
        ogDescription,
        ogUrl,
    } = body;

    const category = await prisma.storeCategory.create({
        data: {
            locale,
            status,
            title,
            name,
            slug,
            faqs,
            description,
            translateLink,
            image,
            coverImage,
            metaTitle,
            metaDescription,
            canonicalUrl,
            ogImage,
            ogTitle,
            ogDescription,
            ogUrl,
            userId: currentUser.id,
        },
    });

    return NextResponse.json(category);
}
