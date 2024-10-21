"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useAreaModal from "@/app/hooks/useAreaModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import ImageUpload from "../customInputs/ImageUpload";
import axios from "axios";
import { Label, Radio, Spinner } from "flowbite-react";

const AreaModal = () => {
    const router = useRouter();
    const newAreaModal = useAreaModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            description: "",
            content: "",
            slug: "",
            image: "",
            lat: 0.0,
            long: 0.0,
            status: "pending",
            isFeatured: false,
            isAddHome: false,
            isFooterMenu: false,
            isRecommended: false,
        },
    });

    const image = watch("image");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        });
    };

    const slugGeneration = (title: string) => {
        const slug = title.toLowerCase().replace(/\s+/g, "-");
        return slug;
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        const generatedSlug = slugGeneration(data.title);
        data.slug = generatedSlug; // Set t

        axios
            .post("/api/areas", data)
            .then(() => {
                toast.success("New item added successfully!", {
                    position: "bottom-right",
                });

                router.refresh();

                newAreaModal.onClose();
                reset();
            })
            .catch(() => {
                toast.error("Error : Can't add new item! ", {
                    position: "bottom-right",
                });
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    const body = (
        <div className="flex flex-col gap-4 px-2 md:px-5 lg:px-5 xl:px-5">
            <Heading title="New Area" subtitle={"Create new area"} />
            <div className="w-full flex gap-8 justify-start items-center">
                <p>Status: </p>
                <div className=" flex gap-2 justify-start items-center">
                    <Radio
                        {...register("status")}
                        value="active"
                        className=" focus:ring-0 transition-all border-green-400 text-green-400"
                    />
                    <Label htmlFor="active">Active</Label>
                </div>
                <div className=" flex gap-2 justify-start items-center">
                    <Radio
                        defaultChecked
                        {...register("status")}
                        value={"pending"}
                        id="pending"
                        className=" focus:ring-0 transition-all  border-orange-200 text-orange-300"
                    />
                    <Label htmlFor="pending">Pending</Label>
                </div>
                <div className=" flex gap-2 justify-start items-center">
                    <Radio
                        {...register("status")}
                        value={"inactive"}
                        id="inactive"
                        className=" focus:ring-0 transition-all  border-red-400 text-red-600"
                    />
                    <Label htmlFor="inactive">Inactive</Label>
                </div>
            </div>
            <div className=" flex gap-3">
                <div className="w-2/3 flex flex-col gap-2">
                    <Input
                        id="title"
                        label="Title"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input
                        id="slug"
                        label="Slug"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                    />
                    <div className="flex gap-2">
                        <Input
                            id="lat"
                            label="Lat"
                            type="number"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                        <Input
                            id="long"
                            label="long"
                            type="number"
                            disabled={isLoading}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                </div>
                <div>
                    <ImageUpload
                        label="Upload thumbnail Image"
                        thumbnail={true}
                        onAction={() => setCustomValue("image", "")}
                        onChange={(value) => {
                            setCustomValue("image", value);
                        }}
                        value={image}
                        image={image}
                    />
                </div>
            </div>
            <div className="flex gap-4 justify-between items-center">
                <div className=" flex gap-2 justify-start items-center">
                    <input
                        id="home"
                        {...register("isAddHome")}
                        type="checkbox"
                        className=" focus:ring-0 transition-all rounded"
                    />
                    <label htmlFor="home">Add to home</label>
                </div>
                <div className=" flex gap-2 justify-start items-center">
                    <input
                        id="featured"
                        {...register("isFeatured")}
                        type="checkbox"
                        className=" focus:ring-0 transition-all rounded"
                    />
                    <label htmlFor="featured">Featured</label>
                </div>
                <div className=" flex gap-2 justify-start items-center">
                    <input
                        id="recommended"
                        {...register("isRecommended")}
                        type="checkbox"
                        className=" focus:ring-0 transition-all rounded"
                    />
                    <label htmlFor="recommended">Recommended</label>
                </div>
                <div className=" flex gap-2 justify-start items-center">
                    <input
                        id="footer"
                        type="checkbox"
                        {...register("isFooterMenu")}
                        className=" focus:ring-0 transition-all rounded"
                    />
                    <label htmlFor="footer">Footer menu</label>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={newAreaModal.isOpen}
            actionLabel={
                isLoading ? (
                    <div className="flex justify-center items-center gap-2">
                        <Spinner
                            aria-label="Spinner button"
                            size="md"
                            className=" text-white fill-rose-500"
                        />
                        <span className="">Creating</span>
                    </div>
                ) : (
                    "Create"
                )
            }
            onClose={newAreaModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={body}
        />
    );
};

export default AreaModal;
