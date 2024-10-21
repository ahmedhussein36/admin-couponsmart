"use client";

import { BiSearch } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";

interface InputProps {
    id?: string;
    Placeholder?: string;
    disabled?: boolean;
    value?: string;
    className?: string;
    onChange: (value: any) => void;
}

const SearchInput: React.FC<InputProps> = ({
    id,
    disabled,
    value,
    Placeholder,
    className,
    onChange,
}) => {
    return (
        <div className="w-full relative rounded-md overflow-hidden">
            <div
                className={` 
                flex justify-center items-center text-gray-400
                 absolute top-3 rtl:left-3 ltr:right-3
           `}
            >
                <BiSearch size={20} />
            </div>
            <input
                type="text"
                autoComplete="off"
                id={id}
                disabled={disabled}
                value={value}
                onChange={(value) => onChange(value)}
                placeholder={Placeholder}
                className={` w-full border-gray-400 border
                        bg-white p-2 px-4 rounded-md dark:bg-transparent
                        focus-visible:outline-none text-sm 
                        dark:text-neutral-200 dark:focus:border-neutral-300 focus:border-neutral-500
                        ${className}
                        `}
            />
        </div>
    );
};

export default SearchInput;
