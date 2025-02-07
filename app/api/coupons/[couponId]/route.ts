import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface CouponParams {
    couponId?: string;
}

export async function DELETE(
    request: Request,
    { params }: { params: CouponParams }
) {
    const { couponId } = params;
    if (!couponId || typeof couponId !== "string") {
        throw new Error("Invalid ID");
    }
    const coupon = await prisma.coupon.delete({
        where: {
            id: couponId,
        },
    });

    return NextResponse.json(coupon);
}

export async function PUT(
    request: Request,
    { params }: { params: CouponParams }
) {
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
        categoryIds,
        countries,
        type,
        views,
        usings,
        likes,
        expiredDate,
        storeId,
    } = body;

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) {
            NextResponse.error();
        }
    });

    const { couponId } = params;
    if (!couponId || typeof couponId !== "string") {
        throw new Error("Invalid ID");
    }
    const coupon = await prisma.coupon.update({
        where: {
            id: couponId,
        },
        data: {
            title,
            status,
            description,
            image,
            locale,
            code,
            discount: parseInt(discount), 
            countries,
            type,
            views: parseInt(views),
            usings: parseInt(usings),
            likes: parseInt(likes),
            expiredDate,
            storeId,
            StoreCategory: {
                set: categoryIds?.map((category: { id: string }) => ({
                    id: category,
                })),
            },
        },
    });

    return NextResponse.json(coupon);
}
