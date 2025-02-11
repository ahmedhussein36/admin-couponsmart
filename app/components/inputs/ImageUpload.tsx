"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { LuImagePlus, LuTrash2 } from "react-icons/lu";
import { CldImage } from "next-cloudinary";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import MediaClient from "../media/MediaCient";

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
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <div className="cursor-pointer">
                                {!value ||
                                (Array.isArray(value) && value.length === 0) ? (
                                    <div
                                        className={`
                                        dark:text-neutral-400  
                                        ${
                                            social
                                                ? "w-[250px] h-[150px]"
                                                : "h-52 w-52"
                                        }
                                        rounded-md 
                                        border flex-col
                                        border-neutral-400 
                                        flex justify-center 
                                        items-center
                                        `}
                                    >
                                        <LuImagePlus size={28} className="" />
                                        <span className="p-2 px-3">
                                            {label ? label : "Upload Image"}
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
                                                        style={{
                                                            objectFit: "cover",
                                                        }}
                                                        src={img}
                                                        alt={`Selected image ${
                                                            index + 1
                                                        }`}
                                                        format={"auto"}
                                                        quality={"auto"}
                                                    />
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            const newValue =
                                                                multiple
                                                                    ? value.filter(
                                                                          (
                                                                              _: any,
                                                                              i: number
                                                                          ) =>
                                                                              i !==
                                                                              index
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
                        </SheetTrigger>
                        <SheetContent
                            aria-describedby={undefined}
                            aria-description=""
                            side="right"
                            className="p-1 min-w-[560px] z-[1000]"
                        >
                            <SheetTitle></SheetTitle>
                            <MediaClient
                                onImageSelect={(imageUrls: any[]) => {
                                    onChange(
                                        multiple ? imageUrls : imageUrls[0]
                                    );
                                    setIsOpen(false);
                                }}
                            />
                        </SheetContent>
                    </Sheet>
                </div>
            )}
        />
    );
};

export default ImageUpload;
