"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useTagModal from "@/app/hooks/useTagModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Textarea from "../customInputs/Textarea";
import axios from "axios";
import { Spinner } from "flowbite-react";

const TagModal = () => {
    const router = useRouter();
    const tagModal = useTagModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            title: "",
            description: "",
            slug: "",
            metaTitle: "",
            metaDescription: "",
        },
    });

    const slugGeneration = (title: string) => {
        const slug = title
            .toLowerCase()
            .replace(/[\|\%\)\(\#\*\@\$\~\!\.\+]+/g, "")
            .replace(/\s+/g, "-")
            .toString();
        return slug;
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        const generatedSlug = slugGeneration(data.title);
        data.slug = generatedSlug;

        axios
            .post("/api/tags", data)
            .then(() => {
                toast.success("New item added successfully!", {
                    position: "bottom-right",
                });

                router.refresh();
                reset();
                tagModal.onClose();
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
            <Heading title="New Tag" />
            <div className=" flex gap-3 justify-end items-end">
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
                </div>
            </div>{" "}
            <Textarea
                id="description"
                label="Description"
                register={register}
                errors={errors}
            />
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={tagModal.isOpen}
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
            onClose={tagModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={body}
        />
    );
};

export default TagModal;
