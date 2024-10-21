"use client";
import ChangePassword from "@/app/components/auth/ChangePassword";
import Button from "@/app/components/buttons/Button";
import Heading from "@/app/components/headings/Heading";
import Input from "@/app/components/inputs/Input";
import PasswordChangeModal from "@/app/components/PasswordChangeModal";
import useConfirm from "@/app/hooks/useConfirm";
import { SafeAdmin } from "@/app/types";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { toast } from "react-toastify";

const userStatus = ["active", "pending", "inactive"];
const userRoles = ["admin", "manager", "editor", "auther", "user"];

interface EditProps {
    user: SafeAdmin;
}

const EditUser: FC<EditProps> = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsopen] = useState(false);
    const router = useRouter();
    const confirm = useConfirm();
    const t = useTranslations("profile");

    const methods = useForm<FieldValues>({
        defaultValues: {
            name: user?.name || "",
            email: user.email || "",
            username: user.username || "",
            role: user.role || "user",
            status: user.status || "pending",
            updateAt: new Date(),
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .put(`/api/register/${user.id}`, data)
            .then(() => {
                toast.success("User has been updated successfuly");
                router.refresh();
            })

            .catch((error) => {
                toast.error(error || "Error : New user can't be update!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <FormProvider {...methods}>
            <PasswordChangeModal
                body={
                    <ChangePassword userEmail={user.email} userId={user.id} />
                }
            />
            <div className="bg-white dark:bg-transparent flex flex-col gap-4 p-6 rounded-lg shadow-md w-full lg:w-2/3 mx-auto">
                <Heading title={t("update user")} />

                <div className="grid grid-cols-2 gap-4 px-2 md:px-5 lg:px-5 xl:px-5">
                    <Input
                        name="name"
                        label={t("name")}
                        disabled={isLoading}
                        required
                    />

                    <Input
                        name="username"
                        label={t("username")}
                        type="text"
                        disabled={isLoading}
                    />
                    <Input
                        name="email"
                        label={t("email")}
                        disabled={isLoading}
                        required
                    />
                    <Button
                        onClick={confirm.onOpen}
                        className=" bg-slate-300/50"
                    >
                        {t("change password")}
                    </Button>
                    <div className="w-full justify-start flex flex-col gap-2">
                        <label className=" text-zinc-400 font-medium">
                            {t("choose user role")}
                        </label>
                        <select
                            {...methods.register("role")}
                            className=" w-full rounded-md py-3 border-2 dark:bg-gray-800 dark:border-neutral-500"
                        >
                            {userRoles.map((role, i) => (
                                <option className=" my-2" key={i} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full justify-start flex flex-col gap-2">
                        <label className=" text-zinc-400 font-medium">
                            {t("choose user status")}
                        </label>
                        <select
                            {...methods.register("status")}
                            className=" w-full rounded-md py-3 border-2 dark:bg-gray-800 dark:border-neutral-500"
                        >
                            {userStatus.map((status, i) => (
                                <option className="my-2" value={status} key={i}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="p-4 my-4 flex justify-center items-center gap-3 w-[300px]">
                    <Button onClick={methods.handleSubmit(onSubmit)}>
                        {isLoading ? (
                            <div className="flex justify-center items-center gap-2">
                                <span className="">{t("updating")} ...</span>
                            </div>
                        ) : (
                            t("save changes")
                        )}
                    </Button>
                    <Button outline onClick={() => router.back()}>
                        {"Back"}
                    </Button>
                </div>
            </div>
        </FormProvider>
    );
};

export default EditUser;
