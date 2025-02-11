import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { CldImage } from "next-cloudinary";

type ImageCardProps = {
    image: {
        public_id: string;
        secure_url: string;
    };
    selected?: boolean;
    onClick: () => void;
    onCopy: () => void;
};

const ImageList: React.FC<ImageCardProps> = ({
    selected,
    image,
    onClick,
    onCopy,
}) => {
    return (
        <div className=" relative w-full h-[8rem] overflow-hidden rounded-md">
            <CldImage
                src={image.secure_url}
                alt={image.public_id}
                priority={false}
                fill
                sizes={" "}
                loading="lazy"
                className={`${
                    selected
                        ? " h-full w-full border-blue-500 opacity-90"
                        : " border-transparent"
                } object-cover border-2 rounded group-hover:scale-105 duration-300 ease-in-out`}
                onClick={onClick}
            />
            <div className="absolute top-2 right-2 flex space-x-2">
                <button
                    className="bg-gray-800/50 flex justify-center items-center text-white w-8 h-8 p-2 rounded-full hover:bg-gray-800 transition-all"
                    onClick={onCopy}
                >
                    <FaRegCopy size={14} />
                </button>
            </div>
        </div>
    );
};

export default ImageList;
