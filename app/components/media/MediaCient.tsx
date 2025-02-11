"use client";

import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { fetchImages } from "@/app/utils/cloudinary";
import UploadButton from "@/app/components/media/UploadButton";
import ImageGrid from "@/app/components/media/ImageGrid";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ImageList from "./ImageList";

type ImageType = {
    public_id: string;
    secure_url: string;
    bytes: number;
    format: string;
    width: number;
    height: number;
    created_at: string;
};

interface MediaClientProps {
    onImageSelect: (imageUrls: string[]) => void;
}

const MediaClient: React.FC<MediaClientProps> = ({ onImageSelect }) => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState(new Set<string>());
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const hasMoreImages = useMemo(() => !!nextCursor, [nextCursor]);

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

    /** تحديث قائمة الصور عند الرفع */
    const handleUpload = useCallback((image: ImageType) => {
        setImages((prev) => [image, ...prev]);
    }, []);

    /** نسخ رابط الصورة */
    const copyToClipboard = useCallback((text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Image URL copied to clipboard");
    }, []);

    /** تبديل تحديد الصورة */
    const toggleImageSelection = useCallback((public_id: string) => {
        setSelectedImages((prev) => {
            const updatedSet = new Set(prev);
            updatedSet.has(public_id)
                ? updatedSet.delete(public_id)
                : updatedSet.add(public_id);
            return updatedSet;
        });
    }, []);

    /** إرسال الصور المحددة */
    const handleSelectImages = useCallback(() => {
        const selectedUrls = images
            .filter(({ public_id }) => selectedImages.has(public_id))
            .map(({ secure_url }) => secure_url);
        onImageSelect(selectedUrls);
    }, [images, selectedImages, onImageSelect]);

    if (error) return <p className="text-center text-red-500">{error}</p>;
    const loadMoreImages = async () => {
        if (nextCursor) {
            const data = await fetchImages(nextCursor);
            setImages((prevImages) => [...prevImages, ...data.resources]);
            setNextCursor(data.next_cursor);
        }
    };

    return (
        <div className="container h-full p-6">
            {/* أزرار التحكم */}
            <div className="flex justify-between items-center mb-3">
                <UploadButton onUpload={handleUpload} />
                <Button
                    onClick={handleSelectImages}
                    disabled={!selectedImages.size}
                >
                    Select {selectedImages.size} Image
                    {selectedImages.size !== 1 ? "s" : ""}
                </Button>
            </div>

            {/* عرض الصور */}
            {loading ? (
                <ImageGrid />
            ) : (
                <div className="grid grid-cols-6 max-h-[38rem] gap-2 overflow-y-scroll">
                    {images.map((image) => (
                        <div
                            key={image.public_id}
                            className="relative h-full cursor-pointer"
                        >
                            <Checkbox
                                checked={selectedImages.has(image.public_id)}
                                onCheckedChange={() =>
                                    toggleImageSelection(image.public_id)
                                }
                                className="absolute top-2 left-2 z-10"
                            />
                            <ImageList
                                selected={selectedImages.has(image.public_id)}
                                image={image}
                                onClick={() =>
                                    toggleImageSelection(image.public_id)
                                }
                                onCopy={() => copyToClipboard(image.secure_url)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* زر تحميل المزيد */}
            {hasMoreImages && (
                <div className="text-center mt-4">
                    <Button onClick={loadMoreImages} disabled={isLoadingMore}>
                        {isLoadingMore ? "Loading..." : "Load More"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default MediaClient;
