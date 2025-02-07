import { Admin, Coupon, Post, Store, StoreCategory } from "@prisma/client";

export type SafeAdmin = Omit<Admin, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
};

export type Faq = {
    id: number;
    question: string;
    answer: string;
};

export type SafeStoreCategory = Omit<StoreCategory, "creatAt" | "updateAt"> & {
    createdAt: string;
    updatedAt: string;
    author: SafeAdmin;
};

export type SafeStore = Omit<Store, "creatAt" | "updateAt"> & {
    createdAt: string;
    updatedAt: string;
    author: SafeAdmin;
    coupons: SafeCoupon[];
    StoreCategory: SafeStoreCategory[];
};

export type SafeCoupon = Omit<Coupon, "creatAt" | "updateAt"> & {
    createdAt: string;
    updatedAt: string;
    Store: SafeStore;
    StoreCategory: SafeStoreCategory[];
};

export type ShortItem = {
    id?: string;
    name?: string;
    image: string;
    title?: string;
    slug?: string;
};

export type SafePost = Omit<Post, "creatAt" | "updateAt">;

export type SafePosts = {
    id: string;
    title: string;
    locale: string;
    status: string;
    author: SafeAdmin;
} & {
    createdAt: string;
    updatedAt: string;
};
