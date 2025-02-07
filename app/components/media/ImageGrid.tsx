import React from "react";
import { BsFillImageFill } from "react-icons/bs";

export const ItemGrid = () => {
    return (
        <div className=" animate-pulse color-wave w-full h-60 bg-muted-foreground/10 dark:bg-muted rounded-md flex justify-center items-center p-4">
            {/* <BsFillImageFill size={48} className=" text-" /> */}
        </div>
    );
};

const ImageGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
            <ItemGrid />
        </div>
    );
};

export default ImageGrid;
