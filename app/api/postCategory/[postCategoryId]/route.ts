import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    postCategoryId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const { postCategoryId } = params;
    if (!postCategoryId || typeof postCategoryId !== "string") {
        throw new Error("Invalid ID");
    }
    const postCategory = await prisma.postCategory.delete({
        where: {
            id: postCategoryId,
        },
    });

    return NextResponse.json(postCategory);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
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
        image,
        translateLink,
        description,
        metaTitle,
        metaDescription,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const { postCategoryId } = params;
    if (!postCategoryId || typeof postCategoryId !== "string") {
        throw new Error("Invalid ID");
    }
    const postCategory = await prisma.postCategory.update({
        where: {
            id: postCategoryId,
        },
        data: {
            locale,
            name,
            status,
            title,
            image,
            translateLink,
            description,
            metaTitle,
            metaDescription,
        },
    });

    return NextResponse.json(postCategory);
}
