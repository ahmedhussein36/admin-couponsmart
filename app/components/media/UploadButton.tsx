"use client";

import { CldUploadWidget } from "next-cloudinary";
import { TbCloudUpload } from "react-icons/tb";

declare global {
    var cloudinary: any;
}

const uploadPreset = "remaxroyal";

type UploadButtonProps = {
    onUpload: (image: any) => void;
};

const UploadButton: React.FC<UploadButtonProps> = ({ onUpload }) => {
    return (
        <CldUploadWidget
            uploadPreset={uploadPreset}
            options={{
                maxFiles: 100,
                folder: "uploads",
            }}
            onUpload={(result) => {
                if (result.event === "success") {
                    onUpload(result.info);
                }
            }}
        >
            {({ open }) => {
                return (
                    <button
                        onClick={() => open?.()}
                        className="
                                bg-rose-500 
                                text-white px-4 
                                py-3 font-medium 
                                min-w-[100px] 
                                rounded-md flex justify-center items-center gap-3
                                hover:bg-rose-600"
                    >
                        <TbCloudUpload size={20} /> Upload Image
                    </button>
                );
            }}
        </CldUploadWidget>
    );
};

export default UploadButton;
