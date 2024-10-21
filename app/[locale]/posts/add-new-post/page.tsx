import React from "react";
import ClientPost from "./ClientPost";
import getPostCategory, { IParams } from "@/app/actions/getPostCategory";
interface Iparams {
    searchParams: IParams;
}

const NewPostPage = async ({ searchParams }: Iparams) => {
    const PostCategory = await getPostCategory(searchParams);
    return (
        <div className="w-full">
            <title>Posts: Add new post</title>
            <ClientPost PostCategories={PostCategory}/>
        </div>
    );
};

export default NewPostPage;
