import React, { ReactElement, ReactNode } from "react";
import { FaCheck, FaCircleCheck } from "react-icons/fa6";

type Category = {
    id: string;
    name: string;
    name_ar: string;
};

interface SelectProps {
    label: string;
    value: ReactElement | ReactNode | string | any;
    selected: boolean;
    onClick: (value: Category) => void;
}

const SelectStore = ({ selected , value, onClick, label }: SelectProps) => {
    return (
        <div
            onClick={() => onClick(value)}
            className={`
                ${selected && "bg-gray-400/20 dark:bg-slate-700"}
                        flex justify-start gap-2 
                        items-center p-2 
                        rounded-md w-full
                        transition-al
                        hover:border-neutral-500 
                        hover:dark:border-neutral-300 
                        cursor-pointer
                        `}
        >
            <div
                className={` flex justify-center items-center
            ${selected ? "bg-sky-500 " : " border-2  border-neutral-400"}
                rounded w-4 h-4`}
            >
                {selected && <FaCheck size={14} color="#ffff" />}
            </div>

            <div>{label}</div>
        </div>
    );
};

export default SelectStore;
