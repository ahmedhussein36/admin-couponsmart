import React from "react";
import ClientPost from "./ClientPost";
import getPostCategory from "@/app/actions/getPostCategory";
import getPostById, { PostParams } from "@/app/actions/getPostById";
interface Iparams {
    params: PostParams;
}

const NewPostPage = async ({ params }: Iparams) => {
    const PostCategory = await getPostCategory();
    const post = await getPostById(params);
    return (
        <div className="w-full">
            <title>Posts: update post</title>
            <ClientPost post={post as any} PostCategories={PostCategory} />
        </div>
    );
};

export default NewPostPage;
