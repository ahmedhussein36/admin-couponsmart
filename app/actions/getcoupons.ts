import prisma from "@/app/libs/prismadb";
import { countries } from "../utils/data";

export interface IParams {
    title?: string;
    status?: string;
    store?: string;
    locale?: string;
    type?: string;
    country?: string;
}

export default async function getCoupons(params: IParams) {
    try {
        const { title, status, locale, store, type, country } = params;

        let query: any = {};

        if (title) {
            query.title = title;
        }
        if (status) {
            query.status = status;
        }
        if (type) {
            query.type = type;
        }
        if (locale) {
            query.locale = locale;
        }
        if (store) {
            query.Store = {
                name: store,
            };
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
                author: true,
            },
            orderBy: {
                createdAt: "desc",
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
