"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React, { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { LuImagePlus } from "react-icons/lu";

interface ImageUploadProps {
    name: string;
    social?: boolean;
    label?: string;
}

const ImageUpload = ({ name, social, label }: ImageUploadProps) => {
    const { control } = useFormContext();

    const handleUpload = useCallback(
        (onChange: (value: string) => void) => (result: any) => {
            onChange(result.info.secure_url);
        },
        []
    );

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <div>
                    <CldUploadWidget
                        onSuccess={handleUpload(onChange)}
                        uploadPreset="next_coupons"
                    >
                        {({ open }) => (
                            <div className="relative">
                                {!value ? (
                                    <div
                                        onClick={() => open()}
                                        className="cursor-pointer"
                                    >
                                        <div
                                            className={`
                                            dark:text-neutral-400  
                                            ${
                                                social
                                                    ? "w-[250px] h-[150px]"
                                                    : "h-52  w-52"
                                            }
                                            rounded-md 
                                            border flex-col
                                            border-neutral-400 
                                            flex justify-center 
                                            items-center
                                            `}
                                        >
                                            <LuImagePlus
                                                size={28}
                                                className=""
                                            />
                                            <span className="p-2 px-3">
                                                {label ? label : "Upload Image"}
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-52 h-52 relative overflow-hidden rounded-md">
                                        <Image
                                            fill
                                            style={{ objectFit: "cover" }}
                                            src={value}
                                            alt={value}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </CldUploadWidget>
                </div>
            )}
        />
    );
};

export default ImageUpload;
