import React from "react";
import CategoryPostClient from "./CategoryPostClient";
import getPostCategory from "@/app/actions/getPostCategory";


const PostCategory = async () => {
    const PostCategory = await getPostCategory();
    return (
        <div>
            <title>Posts: Categories</title>
            <CategoryPostClient categories={PostCategory} />
        </div>
    );
};

export default PostCategory;
