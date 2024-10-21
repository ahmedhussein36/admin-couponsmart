import React from "react";
import CategoryPostClient from "./CategoryPostClient";
import getPostCategory, { IParams } from "@/app/actions/getPostCategory";

interface Iparams {
    searchParams: IParams;
}

const PostCategory = async ({ searchParams }: Iparams) => {
    const PostCategory = await getPostCategory(searchParams);
    return (
        <div>
            <title>Posts: Categories</title>
            <CategoryPostClient categories={PostCategory} />
        </div>
    );
};

export default PostCategory;
