import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

const Selection = ({
    name,
    label,
    options,
}: {
    name: string;
    label?: string;
    options: ReactNode;
}) => {
    const { setValue } = useFormContext();
    const t = useTranslations();
    return (
        <div className=" relative w-full">
            <label
                className= {`
                    text-sm 
                    rtl:right-2 
                    -top-4 ltr:left-2 
                    absolute 
                    bg-white 
                    dark:bg-gray-800 p-1 px-2 
                    text-neutral-500 dark:text-neutral-400 
                `}
            >
                {label}
            </label>
            <select
                className=" w-full border-2 p-2 rounded-md bg-white dark:bg-gray-800 dark:border-neutral-500"
                name={name}
                id={name}
                onChange={(e) => setValue(name, e.target)}
            >
                {options}
            </select>
        </div>
    );
};

export default Selection;
