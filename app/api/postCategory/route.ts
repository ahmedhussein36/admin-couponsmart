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
        name,
        status,
        title,
        slug,
        image,
        translateLink,
        description,
        metaTitle,
        metaDescription,
    } = body;

    const category = await prisma.postCategory.create({
        data: {
            locale,
            status,
            name,
            title,
            slug,
            image,
            translateLink,
            description,
            metaTitle,
            metaDescription,
        },
    });

    return NextResponse.json(category);
}
