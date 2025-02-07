import NoData from "@/app/components/NoData";
import { Heading } from "@/app/utils/importData";
import React from "react";

const CommentPage = async () => {
    return (
        <div>
            <Heading title="Comments" />
            <NoData />
        </div>
    );
};

export default CommentPage;
