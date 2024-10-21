"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

export const SelectItem = ({
    selected,
    value,
    label,
    onclick,
}: {
    value?: any;
    selected?: boolean;
    label: string;
    onclick: (value: any) => void;
}) => {
    return (
        <div
            className={`
                ${
                    selected
                        ? "bg-slate-200 text-neutral-700 dark:bg-gray-500 dark:text-neutral-300"
                        : " dark:text-neutral-300 text-neutral-500"
                }
                flex justify-between rounded-md
                items-center text-sm 
                px-4 py-1 w-full cursor-pointer
                hover:bg-slate-100 hover:text-neutral-700
                dark:hover:bg-gray-600 dark:hover:text-neutral-300
                disabled:text-neutral-300
                transition-all duration-200 ease-in-out
            `}
            onClick={onclick}
        >
            <span>{label}</span>

            {selected && (
                <div>
                    {" "}
                    <FaCircleCheck size={16} color="" />
                </div>
            )}
        </div>
    );
};

export const Options = ({
    children,
    isShow,
}: {
    children: ReactElement;
    isShow?: boolean;
}) => {
    return (
        <div
            className={`
                        ${
                            isShow
                                ? " translate-y-0 opacity-1 top-[3rem]"
                                : "top-[4rem] opacity-0 translate-y-4"
                        }
                        flex w-full duration-300 ease-in-out
                        justify-start items-start
                        absolute left-0 dark:rk:text-neutral-300
                        bg-white dark:bg-gray-700 dark:shadow-none z-50 overflow-y-scroll h-52
                        p-2 rounded-md shadow-xl shadow-gray-200/60`}
        >
            {children}
        </div>
    );
};

const Select = ({
    name,
    value,
    label,
    selected,
}: {
    name: string;
    value?: any;
    label?: string;
    selected?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const { setValue } = useFormContext();

    const t = useTranslations();

    const handleChange = () => {
        setIsOpen(!isOpen);
    };

    const handleRemoveSelect = () => {
        setSelectedValue("");
    };

    useEffect(() => {
        setValue(name, selectedValue);
    }, [name, selectedValue, setValue]);

    return (
        <div className=" flex flex-col justify-start items-start gap-1 ">
            <div className=" text-sm text-neutral-500 dark:text-neutral-300">
                {label}
            </div>
            <div
                className=" 
                relative bg-white dark:bg-gray-700
                cursor-pointer p-2 
                flex justify-between 
                items-center
                rounded w-52
                dark:border-neutral-500 
                dark:border-0
        "
                onClick={() => {
                    setIsOpen(isOpen === true ? false : true);
                    setIsShow(isOpen === true ? false : true);
                }}
            >
                <div className="text-sm">
                    {selectedValue ? selectedValue : t("stores.all")}
                </div>

                {selectedValue !== "" ? (
                    <button
                        className="
                            h-5 w-5 flex justify-center items-center z-50
                            rounded-full bg-red-100 text-sm text-red-500 
                            "
                        onClick={handleRemoveSelect}
                    >
                        <CgClose size={16} />
                    </button>
                ) : (
                    <button
                        className="
            h-5 w-5 flex justify-center items-center z-50
           rounded-full  text-sm text-neutral-500 "
                        onClick={handleRemoveSelect}
                    >
                        <IoIosArrowDown size={16} />
                    </button>
                )}

                {isOpen && (
                    <Options isShow={isShow}>
                        <div className="flex flex-col w-full justify-start items-start gap-1">
                            {Array(10)
                                .fill(0)
                                .map((_, index) => (
                                    <SelectItem
                                        key={index}
                                        label={`Option ${index + 1}`}
                                        selected={
                                            `Option ${index + 1}` ===
                                            selectedValue
                                        }
                                        onclick={() =>
                                            setSelectedValue(
                                                `Option ${index + 1}`
                                            )
                                        }
                                    />
                                ))}
                        </div>
                    </Options>
                )}
            </div>
        </div>
    );
};

export default Select;
