'use client';

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(Boolean);
  const ltr = false//(router as any).locale === 'en';

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<FieldValues> =
    (data) => {
      setIsLoading(true);

      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          setIsLoading(false);

          if (callback?.ok) {
            router.refresh();
            loginModal.onClose();
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
    }

  useEffect(() => {
    if (loginModal.isOpen) {
      setEmail(false);
    }
  }, [loginModal.isOpen])

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal])

  const emailLogin = (
    <div className="flex flex-col gap-4 px-2 md:px-5 lg:px-5 xl:px-5">
      <Heading
        title={ltr ? "Welcome back" : "مرحبا بك!"}
        subtitle={ltr ? "Login to your account!" : " تسجيل الدخول إلى حسابك"}
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
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const socialLogin = (
    <div className="flex flex-col gap-4 mt-3 px-2 md:px-5 lg:px-5 xl:px-5">
      <Button
        outline
        label={ltr ? 'Continue with Google' : 'متابعة باستخدام جوجل'}
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label={ltr ? 'Continue with Facebook' : 'متابعة باستخدام فيسبوك'}
        icon={FaFacebook}
        onClick={() => signIn('facebook')}
      />
      <Button
        outline
        label={ltr ? 'Continue with Email' : 'متابعة باستخدام البريد الإلكتروني'}
        icon={MdMail}
        onClick={() => setEmail(true)}
      />
    </div>
  )

  const footer = (
    <div className="
      text-neutral-500 text-sm text-center mt-4 font-light px-2 md:px-5 lg:px-5 xl:px-5">
      <p> {ltr ? 'You dont have an account?' : 'ليس لديك حساب؟ '}
        <span
          onClick={onToggle}
          className="
              text-red-500
              text-sm
              cursor-pointer 
              hover:underline
            "
        >  {ltr ? 'Create an account' : 'أنشاء حساب جديد '}</span>
      </p>
    </div>)


  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title={ltr ? 'Login' : 'تسجيل الدخول '}
      actionLabel={ltr ? 'Continue' : 'متابعة'}
      onClose={loginModal.onClose}
      onSubmit={email ? handleSubmit(onSubmit) : () => setEmail(true)}
      body={!email ? socialLogin : emailLogin}
      footer={footer}
    />
  )
};

export default LoginModal;
