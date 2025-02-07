import React, { ReactElement, ReactNode } from "react";
import { FaCircleCheck } from "react-icons/fa6";

type Category = {
    id: string;
    name: string;
    name_ar: string;
};

interface SelectProps {
    label: ReactElement | ReactNode | string | any;
    value: ReactElement | ReactNode | string | any;
    selected: boolean;
    onClick: (value: Category) => void;
}

const SelectItem = ({ selected, value, onClick, label }: SelectProps) => {
    return (
        <div
            onClick={() => onClick(value)}
            className={`
                        ${
                            selected
                                ? " border border-sky-400 dark:border-sky-400"
                                : "border border-neutral-500"
                        }
                        flex justify-between 
                        items-center p-2 
                        rounded-md w-full
                        transition-al bg-white dark:bg-slate-700
                        hover:border-neutral-500 
                        hover:dark:border-neutral-300 
                        cursor-pointer shadow shadow-slate-300/20
                        `}
        >
            <div>{label}</div>
            {selected && (
                <div className=" text-lime-400">
                    <FaCircleCheck size={22} />
                </div>
            )}
        </div>
    );
};

export default SelectItem;
