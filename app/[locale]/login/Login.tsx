// app/login/page.tsx
"use client";
import Button from "@/app/components/buttons/Button";
import Heading from "@/app/components/headings/Heading";
import Input from "@/app/components/inputs/Input";
import { Spinner } from "@/components/ui/spinner";
import { signIn } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import { useTranslations } from "next-intl";
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

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            const response = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (response?.ok) {
                router.refresh();
                toast.success("Done! You logged in successfully");
            } else {
                throw new Error(response?.error || "Login failed");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <title>Auth: Login</title>
            <div className="text-white  p-4 justify-center items-center login-box bg-gray-900 min-h-screen lg:p-0 m-0">
                <span className="bg-blur"></span>
                <div className="w-full flex gap-2 justify-center items-center p-5">
                    {/* <GoShieldLock size={25} color="orange" /> */}
                    <Heading title={t("login")} />
                </div>

                <div
                    className="lg:w-fit shadow-md
                                    backdrop:blur-lg
                                    m-auto bg-gray-700/50 
                                    p-6 rounded-xl flex flex-col 
                                    justify-start items-center gap-7
            "
                >
                    <div className="flex justify-center">
                        <CldImage
                            src={
                                "https://res.cloudinary.com/ds04j5ge0/image/upload/v1739010321/logo-icon_fo5kfp.png"
                            }
                            alt="coupomart-logo"
                            width={80}
                            height={80}
                            priority
                            className="w-auto h-auto"
                        />
                    </div>
                    <div className="font-semibold text-2xl">
                        {/* {t("welcome")} */}
                        <h2 className="font-medium text-lg opacity-60">
                            {t("login to your account")}
                        </h2>
                    </div>
                    <div className="w-full lg:w-[500px]  flex flex-col justify-start items-center gap-6">
                        <div className=" w-full relative">
                            <Input
                                className="bg-transparent"
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
                                className="bg-transparent"
                                name="password"
                                placeholder="Password"
                                type={type}
                            />
                        </div>
                    </div>
                    <Button
                        outline
                        className="text-white text-lg  flex justify-center items-center gap-2 w-full duration-300 ease-in-out"
                        onClick={methods.handleSubmit(onSubmit)}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <Spinner size={"md"} className="bg-white mx-2" />
                        )}
                        {t("login")}
                    </Button>
                </div>
            </div>
        </FormProvider>
    );
};

export default Login;
