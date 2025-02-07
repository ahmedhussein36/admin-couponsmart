// app/login/page.tsx
"use client";
import { Button, Heading, Input } from "@/app/utils/importData";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { GoShieldLock } from "react-icons/go";
import { IoEyeOffOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("password");
    const t = useTranslations("login");

    const showPassword = () => {
        if (type === "password") {
            setType("text");
        } else {
            setType("password");
        }
    };

    const methods = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                router.refresh();
                toast.success("Done, logged in");
            }

            if (callback?.error) {
                toast.error(callback.error || "failed to login");
            }
        });
    };

    return (
        <FormProvider {...methods}>
            <title>Auth: Login</title>
            <div
                className=" bg-slate-200 p-4
            justify-center items-center login-box bg- dark:bg-gray-900 min-h-screen lg:p-0 m-0"
            >
                <span className="bg-blur"></span>
                <div className="w-full flex gap-2 justify-center items-center p-5">
                    <GoShieldLock size={25} color="orange" />
                    <Heading title={t("login")} />
                </div>

                <div
                    className=" bg-white lg:w-fit shadow-md
                                    backdrop:blur-lg
                                    m-auto dark:bg-gray-700/50 
                                    p-6 rounded-xl flex flex-col 
                                    justify-start items-center gap-7
            "
                >
                    <div className="flex justify-center">
                        <Image
                            src={"/images/couponmart.png"}
                            alt="coupomart-logo"
                            width={80}
                            height={100}
                        />
                    </div>
                    <div className="font-semibold text-2xl">
                        {t("welcome")}
                        <h2 className="font-medium text-lg opacity-60">
                            {t("login to your account")}
                        </h2>
                    </div>
                    <div className="w-full lg:w-[500px]  flex flex-col justify-start items-center gap-6">
                        <div className=" w-full relative">
                            <Input
                                name="email"
                                type="text"
                                placeholder="Email"
                            />
                        </div>
                        <div className="w-full relative">
                            <div
                                onClick={showPassword}
                                className="h-full cursor-pointer absolute top-4 ltr:right-4 z-10 rtl:left-3"
                            >
                                <IoEyeOffOutline />
                            </div>
                            <Input
                                name="password"
                                placeholder="Password"
                                type={type}
                            />
                        </div>
                    </div>
                    <Button onClick={methods.handleSubmit(onSubmit)}>
                        {t("login")}
                    </Button>
                </div>
            </div>
        </FormProvider>
    );
};

export default Login;
