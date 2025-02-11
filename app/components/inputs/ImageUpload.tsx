"use client";

import { Key, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { LuImagePlus, LuTrash2 } from "react-icons/lu";
import { CldImage } from "next-cloudinary";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";

import MediaClient from "../media/MediaCient";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
    name: string;
    social?: boolean;
    label?: string;
    multiple?: boolean;
}

const ImageUpload = ({
    name,
    social,
    label,
    multiple = false,
}: ImageUploadProps) => {
    const { control } = useFormContext();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <div>
                    <div
                        className="cursor-pointer"
                        onClick={() => setIsOpen(true)}
                    >
                        {!value ||
                        (Array.isArray(value) && value.length === 0) ? (
                            <div
                                className={`dark:text-neutral-400 rounded-md border border-neutral-400 flex flex-col justify-center items-center 
                                ${
                                    social ? "w-[250px] h-[150px]" : "h-52 w-52"
                                }`}
                            >
                                <LuImagePlus size={28} />
                                <span className="p-2 px-3">
                                    {label || "Upload Image"}
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {(multiple ? value : [value]).map(
                                    (img: string, index: number) => (
                                        <div
                                            key={index}
                                            className="w-52 h-52 relative overflow-hidden rounded-md"
                                        >
                                            <CldImage
                                                fill
                                                style={{ objectFit: "cover" }}
                                                src={img}
                                                alt={`Selected image ${
                                                    index + 1
                                                }`}
                                                format="auto"
                                                quality="auto"
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const newValue = multiple
                                                        ? value.filter(
                                                              (
                                                                  _: any,
                                                                  i: number
                                                              ) => i !== index
                                                          )
                                                        : "";
                                                    onChange(newValue);
                                                }}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                                aria-label="Delete image"
                                            >
                                                <LuTrash2 size={20} />
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent 
                        aria-modal
                        aria-describedby={undefined}  
                        className="max-w-[100wv] max-h-screen w-screen h-screen">
                            {/* <DialogHeader className=" h-fit">
                                <DialogTitle>Select Image</DialogTitle>
                            </DialogHeader> */}
                            <MediaClient
                                onImageSelect={(imageUrls) => {
                                    onChange(
                                        multiple ? imageUrls : imageUrls[0]
                                    );
                                    setIsOpen(false);
                                }}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        />
    );
};

export default ImageUpload;
