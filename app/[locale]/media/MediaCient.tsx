/* eslint-disable @next/next/no-before-interactive-script-outside-document */
"use client";

import React, { useState, useEffect } from "react";
import { fetchImages, deleteImage } from "@/app/utils/cloudinary";
import UploadButton from "@/app/components/media/UploadButton";
import ImageCard from "@/app/components/media/ImageCard";
import ImageDrawer from "@/app/components/media/ImageDrawer";
import ImageGrid from "@/app/components/media/ImageGrid";
import Confirm from "@/app/components/Confirm";
import useConfirm from "@/app/hooks/useConfirm";
import { toast } from "react-toastify";
import Heading from "@/app/components/headings/Heading";

type ImageType = {
    public_id: string;
    secure_url: string;
    bytes: number;
    format: string;
    width: number;
    height: number;
    created_at: string;
};

const MediaCient: React.FC = () => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [imageId, setImageId] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [nextCursor, setNextCursor] = useState<string | null>(null);

    const confirm = useConfirm();

    useEffect(() => {
        const loadImages = async () => {
            try {
                const data = await fetchImages();
                setImages(data.resources);
                setNextCursor(data.next_cursor);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch images");
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    const handleUpload = (image: any) => {
        const uploadedImage = {
            public_id: image.public_id,
            secure_url: image.secure_url,
            bytes: image.bytes,
            format: image.format,
            width: image.width,
            height: image.height,
            created_at: image.created_at,
        };
        setImages((prevImages) => [uploadedImage, ...prevImages]);
        setIsDrawerOpen(true);
        setSelectedImage(image);
    };

    const handleImageClick = (image: ImageType) => {
        setSelectedImage(image);
        setIsDrawerOpen(true);
    };

    const useImage = (url: string) => {};

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Image URL copied to clipboard");
    };

    const handleDownload = (url: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = url.split("/").pop() || "image";
        link.click();
    };

    const handleDelete = async (public_id: string) => {
        try {
            if (!public_id) return null;
            // await deleteImage(public_id);
            await toast.promise(deleteImage(public_id), {
                pending: "Deleting Image ...",
                success: "Image deleted successfully!",
                error: {
                    render() {
                        return error || "Error: Unable to update this coupon.";
                    },
                },
            });
            setImages(images.filter((image) => image.public_id !== public_id));

            confirm.onClose();
            setIsDrawerOpen(false);
        } catch (error) {
            toast.error("Failed to delete image");
        }
    };

    const loadMoreImages = async () => {
        if (nextCursor) {
            const data = await fetchImages(nextCursor);
            setImages((prevImages) => [...prevImages, ...data.resources]);
            setNextCursor(data.next_cursor);
        }
    };

    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <>
            <Confirm
                onDelete={() => handleDelete(imageId || "")}
                isLoading={loading}
            />
            <div className="container mx-auto p-4">
                <div className=" flex justify-between items-center mb-8 w-full">
                    <Heading title="Library" />
                    <UploadButton onUpload={handleUpload} />
                </div>

                {loading ? (
                    <ImageGrid />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {images.map((image) => (
                            <ImageCard
                                key={image.public_id}
                                image={image}
                                onClick={() => handleImageClick(image)}
                                onCopy={() => copyToClipboard(image.secure_url)}
                                onDownload={() =>
                                    handleDownload(image.secure_url)
                                }
                                onDelete={() => {
                                    setImageId(image.public_id);
                                    confirm.onOpen();
                                }}
                                onDetails={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                )}
                {nextCursor && (
                    <div className="text-center mt-8">
                        <button
                            className=" bg-indigo-50 border border-indigo-700 text-black px-6 py-3 rounded-md 
                                    transition-all hover:bg-indigo-100 mt-4"
                            onClick={loadMoreImages}
                        >
                            Show More Images
                        </button>
                    </div>
                )}
                <ImageDrawer
                    image={selectedImage}
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    onCopy={copyToClipboard}
                    onUse={copyToClipboard}
                    onDelete={() => {
                        setImageId(selectedImage?.public_id);
                        confirm.onOpen();
                    }}
                />
            </div>
        </>
    );
};

export default MediaCient;
