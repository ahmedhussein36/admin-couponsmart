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
        title,
        status,
        description,
        image,
        locale,
        code,
        discount,
        categories,
        countries,
        type,
        views,
        usings,
        likes,
        expiredDate,
        storeId,
    } = body;

    const coupon = await prisma.coupon.create({
        data: {
            title,
            status,
            description,
            image,
            locale,
            code,
            discount,
            countries,
            type,
            views: parseInt(views),
            usings: parseInt(usings),
            likes: parseInt(likes),
            expiredDate,
            storeId,
            StoreCategory: {
                connect: categories?.map((category: { id: string }) => ({
                    id: category.id,
                })),
            },
            userId: currentUser.id,
        },
    });

    return NextResponse.json(coupon);
}
