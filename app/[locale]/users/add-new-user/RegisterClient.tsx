"use client";

import axios from "axios";
import { useState } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import Selection from "@/app/components/inputs/Selection";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import Heading from "@/app/components/headings/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/buttons/Button";


const userStatus = ["pending", "active", "inactive"];
const userRoles = ["user", "editor", "manager", "auther", "admin"];

const RegisterClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const t = useTranslations();

    const methods = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            role: "user",
            status: "pending",
            createAt: new Date(),
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/register", data)
            .then(() => {
                toast.success("New User has been added successfuly");
                router.back();
                methods.reset();
            })

            .catch((error) => {
                toast.error(error || "Error : New user can't be added!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <FormProvider {...methods}>
            <div className=" bg-white dark:bg-transparent max-w-[600px] p-8 rounded-lg flex flex-col justify-start items-center gap-6">
                <Heading title={t("buttons.add new user")} />
                <Input name="name" label={t("inputs.name")} />
                <Input name="email" label={t("inputs.email")} />
                <Input name="username" label={t("inputs.username")} />
                <Input name="password" label={t("inputs.password")} />
                <Selection
                    name="role"
                    label={t("inputs.role")}
                    options={userRoles.map((role) => (
                        <option key={role} value={role}>
                            {role}
                        </option>
                    ))}
                />
                <Selection
                    name="status"
                    label={t("inputs.status")}
                    options={userStatus.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                />
                <Button
                    disabled={isLoading}
                    onClick={methods.handleSubmit(onSubmit)}
                >
                    Add new user
                </Button>
            </div>
        </FormProvider>
    );
};

export default RegisterClient;
