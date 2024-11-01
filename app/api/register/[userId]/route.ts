import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
// import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    userId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    // const currentUser = await getCurrentUser();

    // if (!currentUser) {
    //     return NextResponse.error();
    // }

    // console.log(currentUser?.role);

    const { userId } = params;

    if (!userId || typeof userId !== "string") {
        throw new Error("Invalid ID");
    }

    const user = await prisma.admin.delete({
        where: { 
            id: userId,
        },
    });

    return NextResponse.json(user);
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    // const currentUser = await getCurrentUser();

    // if (!currentUser) {
    //     return NextResponse.error();
    // }

    const body = await request.json();
    const { email, name, username, status, image, role } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const { userId } = params;

    if (!userId || typeof userId !== "string") {
        throw new Error("Invalid ID");
    }

    const user = await prisma.admin.updateMany({
        where: {
            id: userId,
        },
        data: {
            email,
            name,
            username,
            status,
            role,
            image,
        },
    });

    return NextResponse.json(user);
}
