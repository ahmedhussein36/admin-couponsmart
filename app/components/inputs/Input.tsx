"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface InputProps {
    name: string;
    label?: string;
    placeholder?: string;
    className?: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
}

const Input = ({
    type,
    label,
    name,
    disabled,
    placeholder,
    className,
    required,
}: InputProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: required ? "This field is required" : false }}
            render={({ field, fieldState: { error } }) => (
                <div className=" relative w-full flex flex-col justify-start items-start">
                    {label && (
                        <label
                            htmlFor={name}
                            className={`text-sm rtl:right-2 
                                    -top-4 ltr:left-2 absolute bg-white dark:bg-gray-800 p-1 px-2
                                    ${
                                        error
                                            ? "text-red-500"
                                            : "text-neutral-500 dark:text-neutral-400 "
                                    }
                `}
                        >
                            {label}
                        </label>
                    )}
                    <input
                        id={name}
                        type={type}
                        {...field}
                        placeholder={placeholder}
                        disabled={disabled}
                        required={required}
                        autoComplete="none"
                        className={` w-full dark:border-neutral-500 border-2
                                    bg-white py-3 px-4 rounded-md dark:bg-transparent
                                    focus-visible:outline-none text-sm
                                    dark:text-neutral-200 dark:focus:border-neutral-300 focus:border-neutral-500
                                    
                                    ${
                                        error
                                            ? "border-red-500 dark:border-red-500"
                                            : "border-neutral-300 dark:border-neutral-500 "
                                    }
                                    ${className}
                                    `}
                    />
                    {error && (
                        <span className="text-red-500 text-sm">
                            {error.message}
                        </span>
                    )}
                </div>
            )}
        />
    );
};

export default Input;
