import {Admin, Coupon, Store, StoreCategory} from '@prisma/client'


export type SafeAdmin = Omit<
Admin,
    "createdAt" | "updatedAt"
> & {
    createdAt: string;
    updatedAt: string;
};


export type Faq ={
  id: number
  question: string
  answer :string
}


export type SafeStore = Omit<
 Store, "creatAt" | "updateAt">
&{
  createdAt: string;
  updatedAt: string;
}


export type SafeCoupon = Omit<
 Coupon, "creatAt" | "updateAt">
&{
  createdAt: string;
  updatedAt: string;
}

export type SafeStoreCategory = Omit<
StoreCategory, "creatAt" | "updateAt">
&{
  createdAt: string;
  updatedAt: string;
}

export type ShortItem ={
  id?: string;
  name?: string;
  image: string
  title?: string;
  slug?: string;
}