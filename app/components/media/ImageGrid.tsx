import React from "react";

export const ItemGrid = () => {
    return (
        <div
            className=" animate-pulse w-full 
        h-[100px] bg-muted-foreground/10 dark:bg-muted 
        rounded-md flex justify-center items-center p-4"
        ></div>
    );
};

const ImageGrid = ({ size }: { size?: number }) => {
    return (
        <div className="grid grid-cols-6  gap-2">
            {Array(size || 24)
                .fill(0)
                .map((_, index) => (
                    <ItemGrid key={index} />
                ))}
        </div>
    );
};

export default ImageGrid;
