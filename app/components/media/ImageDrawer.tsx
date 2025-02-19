/* eslint-disable @next/next/no-img-element */
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import { BiTrash } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type ImageDrawerProps = {
    image: {
        public_id: string;
        secure_url: string;
        bytes: number;
        format: string;
        width: number;
        height: number;
        created_at: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
    onCopy: (text: string) => void;
    onDelete: (text: string) => void;
    onUse: (value: string) => void;
};

const ImageDrawer: React.FC<ImageDrawerProps> = ({
    image,
    isOpen,
    onClose,
    onCopy,
    onDelete,
    onUse,
}) => {
    return (
        <div
            className={` text-sm fixed top-0 right-0 h-full w-[450px] bg-background shadow-2xl shadow-slate-400/60 transform transition-transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="p-6">
                <button className=" bg-muted p-1 rounded-md" onClick={onClose}>
                    <IoClose size={24} />
                </button>
                {image && (
                    <>
                        <div className=" relative w-full h-[250px] my-4 bg-slate-100 overflow-hidden">
                            <img
                                src={`${image.secure_url}`}
                                alt={image.public_id}
                                className="relative w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-start gap-2">
                            <div
                                className=" flex justify-start items-center space-x-2"
                                title={image.public_id}
                            >
                                <span className=" text-zinc-500">
                                    File Name:
                                </span>
                                <span className=" text-sm">
                                    {image.public_id.slice(0, 40)}
                                </span>
                            </div>
                            <div
                                className=" flex justify-start items-center space-x-2"
                                title={image.public_id}
                            >
                                <span className=" text-zinc-500">
                                    Upload date:
                                </span>
                                <span className=" text-sm">
                                    {image.created_at
                                        .replace("T", " ")
                                        .replace("Z", "")}
                                </span>
                            </div>
                            <div className=" p-y-2 my-2 text-sm w-full flex justify-start items-center gap-4">
                                <p className=" bg-muted border border-gray-400 rounded-md p-2 px-3">
                                    {(image.bytes / 1024).toFixed(2)} KB
                                </p>
                                <p className=" bg-muted border border-gray-400 rounded-md p-2 px-3">
                                    {image.format}
                                </p>
                                <p className=" bg-muted border border-gray-400 rounded-md p-2 px-3">
                                    {image.width} x {image.height} px
                                </p>
                            </div>
                        </div>

                        <div className=" flex flex-col justify-around py-1 my-3 items-center w-full space-y-3">
                            <button
                                className=" w-full bg-blue-100 text-blue-800 px-6 py-3 rounded-md border border-blue-600
                                    text-center hover:bg-blue-200 flex justify-center items-center transition-all"
                                onClick={() => onUse(image.secure_url)}
                            >
                                Use this image
                            </button>
                            <button
                                className=" w-full bg-accent px-6 py-3 rounded-md border border-muted-foreground
                                    text-center hover:bg-blue-200 flex justify-center items-center transition-all"
                                onClick={() => onCopy(image.secure_url)}
                            >
                                <FaRegCopy className="mr-2" /> Copy Image URL
                            </button>

                            <button
                                className=" w-full bg-rose-50 text-rose-600 px-6 py-3 rounded-md border border-rose-600
                                    text-center hover:bg-rose-100 flex justify-center items-center transition-all"
                                onClick={() => {
                                    onDelete(image.public_id);
                                }}
                            >
                                <BiTrash className="mr-2" /> Delete Image
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageDrawer;
