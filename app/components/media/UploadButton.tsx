"use client";

import { CldUploadWidget } from "next-cloudinary";
import { TbCloudUpload } from "react-icons/tb";
declare global {
    var cloudinary: any;
}

const uploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || "next_coupons";

type UploadButtonProps = {
    onUpload: (image: any) => void;
};

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
    return (
        <CldUploadWidget
            uploadPreset={uploadPreset}
            options={{
                folder: "uploads",
            }}
            onSuccess={(result) => {
                if (result.event === "success") {
                    onUpload(result.info);
                }
            }}
        >
            {({ open }) => {
                return (
                    <button
                        onClick={() => {
                            open?.();
                        }}
                        className="
                                bg-blue-500 
                                text-white px-4 
                                py-1 font-medium 
                                min-w-[100px] 
                                rounded-md flex justify-center items-center gap-3
                                hover:bg-blue-600"
                    >
                        <TbCloudUpload size={20} /> Upload Image
                    </button>
                );
            }}
        </CldUploadWidget>
    );
};

export default UploadButton;
