import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { hash } from "bcrypt";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    userId?: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (currentUser?.role !== "admin") {
        return NextResponse.error();
    }

    const body = await request.json();
    const {newPassword } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const hashedPassword = await hash(newPassword, 10);


    const { userId } = params;

    if (!userId || typeof userId !== "string") {
        throw new Error("Invalid ID");
    }

    const user = await prisma.admin.update({
        where: {
            id: userId,
        },
        data: {
            hashedPassword
        },
    });

    return NextResponse.json(user);
}
