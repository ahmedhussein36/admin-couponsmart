"use client";
import { cn } from "@/lib/utils";
import React, { ReactElement, ReactNode } from "react";
interface ButtonProps {
    children?: ReactNode;
    onClick: () => void;
    outline?: boolean;
    disabled?: boolean;
    className?: string;
}
const Button = ({
    children,
    onClick,
    outline,
    disabled,
    className,
}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={cn(
                `
            ${
                outline
                    ? "bg-transparent border border-gray-400 hover:border-gray-600 dark:text-neutral-100 text-neutral-600"
                    : className || "bg-sky-400  hover:bg-sky-400/80"
            }
                        disabled:bg-slate-200/30 disabled:cursor-not-allowed 
                        flex justify-center
                        rounded-md  text-black
                        transition-all font-semibold
                        items-center py-2 px-6 text-sm 
                
        `,
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
