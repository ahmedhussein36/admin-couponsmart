import React from "react";
import ClientPost from "./ClientPost";
import getPostCategory from "@/app/actions/getPostCategory";

const NewPostPage = async () => {
    const PostCategory = await getPostCategory();
    return (
        <div className="w-full">
            <title>Posts: Add new post</title>
            <ClientPost PostCategories={PostCategory} />
        </div>
    );
};

export default NewPostPage;
