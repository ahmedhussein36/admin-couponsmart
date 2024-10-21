import prisma from "@/app/libs/prismadb";

interface IParams {
    couponId?: string;
}

export default async function getCouponById(params: IParams) {
    try {
        const { couponId } = params;

        const coupon = await prisma.coupon.findUnique({
            where: {
                id: couponId,
            },
            include: {
                Store: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                StoreCategory: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });

        if (!coupon) {
            return null;
        }

        const safeCoupon = {
            ...coupon,
            createdAt: coupon?.createdAt?.toString(),
        };

        return safeCoupon;
    } catch (error: any) {
        throw new Error(error);
    }
}
