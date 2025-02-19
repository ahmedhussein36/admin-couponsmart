/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { FaRegCopy } from "react-icons/fa";
import ActionMenu from "./ActionMenu";
import { CldImage } from "next-cloudinary";

type ImageCardProps = {
    image: {
        public_id: string;
        secure_url: string;
    };
    onClick: () => void;
    onCopy: () => void;
    onDownload: () => void;
    onDelete: () => void;
    onDetails: () => void;
};

const ImageCard: React.FC<ImageCardProps> = ({
    image,
    onClick,
    onCopy,
    onDownload,
    onDelete,
    onDetails,
}) => {
    return (
        <div className="relative w-full h-[120px] overflow-hidden rounded-md">
            <img
                src={image.secure_url}
                alt={image.public_id}
                loading="lazy"
                className="w-full relative cursor-pointer h-full object-cover rounded hover:scale-105 duration-300 ease-in-out"
                onClick={onClick}
            />
            <div className="absolute top-2 right-2 flex space-x-2">
                <button
                    className="bg-gray-800/50 flex justify-center items-center text-white w-8 h-8 p-2 rounded-full hover:bg-gray-800 transition-all"
                    onClick={onCopy}
                >
                    <FaRegCopy size={14} />
                </button>
                <ActionMenu
                    onCopy={onCopy}
                    onDownload={onDownload}
                    onDelete={onDelete}
                    onDetails={onDetails}
                />
            </div>
        </div>
    );
};

export default ImageCard;
