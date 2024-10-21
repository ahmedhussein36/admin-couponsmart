import prisma from "@/app/libs/prismadb";

export interface IParams {
    title?: string;
    status?: string;
    locale?: string;
}

export default async function getCoupons(params: IParams) {
    try {
        const { title, status, locale } = params;

        let query: any = {};

        if (title) {
            query.title = title;
        }
        if (status) {
            query.status = status;
        }
        if (locale) {
            query.locale = locale;
        }

        const coupons = await prisma.coupon.findMany({
            where: query,
            include: {
                Store: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                auther: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        const safeCoupon = coupons.map((safeCoupon) => ({
            ...safeCoupon,
        }));

        return safeCoupon;
    } catch (error: any) {
        throw new Error(error);
    }
}
