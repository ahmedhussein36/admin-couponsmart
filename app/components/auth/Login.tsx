"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import Heading from "../headings/Heading";

const Login = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(Boolean);

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
            }

            if (callback?.error) {
                alert(callback.error);
            }
        });
    };

    return (
        <html>
            <head>
                <title>login</title>
                <meta name="title" content="login page" />
            </head>
            <body>
                <FormProvider {...methods}>
                    <div className="flex flex-col gap-4 px-5 justify-start items-center">
                        <Heading title={"Login To Your Account"} />
                        <form>
                            <Input name="email" required />
                            <Input name="password" required />
                            <Button onClick={methods.handleSubmit(onSubmit)}>
                                Login
                            </Button>
                        </form>
                    </div>
                </FormProvider>
            </body>
        </html>
    );
};

export default Login;
