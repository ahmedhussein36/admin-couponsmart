"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const ltr = false; //(router as any).locale === 'en';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            createAt: new Date(),
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios
            .post("/api/register", data)
            .then(() => {
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const onToggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const bodyContent = (
        <div className="flex flex-col justify-center gap-4 px-2 md:px-5 lg:px-5 xl:px-5">
            <Heading
                title={
                    ltr
                        ? "Welcome, Create an account"
                        : "مرحبا, انشئ حسابك الجديد"
                }
                // subtitle={ltr? "Create an account!": 'قم بإنشاء حساب!'}
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <>
            <div className="flex gap-4 mt-1 w-full justify-between items-center px-2 md:px-5 lg:px-5 xl:px-5">
                <Button
                    outline
                    label="With Google"
                    icon={FcGoogle}
                    onClick={() => signIn("google")}
                />
                <Button
                    outline
                    label="With Facebook"
                    icon={FaFacebook}
                    onClick={() => signIn("facebook")}
                />
            </div>

            <div
                className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
            >
                <p>
                    {ltr
                        ? "Already you have an account?"
                        : "لديك حساب بالفعل؟ "}
                    <span
                        onClick={onToggle}
                        className="
              text-red-600
              cursor-pointer 
              hover:underline
            "
                    >
                        {ltr ? "Login" : "تسجيل الدخول"}
                    </span>
                </p>
            </div>
        </>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title={ltr ? "Login" : "إنشاء حساب جديد "}
            actionLabel={ltr ? "Continue" : "أنشاء حساب"}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
};

export default RegisterModal;
