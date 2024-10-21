import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface MultiValueInputProps {
    name: string;
}

const TagsInput: React.FC<MultiValueInputProps> = ({ name }) => {
    const { control, setValue, getValues } = useFormContext();
    const [inputValue, setInputValue] = useState("");

    const handleAddValue = () => {
        if (inputValue.trim()) {
            const currentValues = getValues(name) || [];
            setValue(name, [...currentValues, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleRemoveValue = (index: number) => {
        const currentValues = getValues(name) || [];
        const newValues = currentValues.filter(
            (_: string, i: number) => i !== index
        );
        setValue(name, newValues);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddValue();
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className=" w-full flex flex-col space-y-2">
                    <div className="flex relative ">
                        <label
                            htmlFor="keyword"
                            className="text-sm rtl:right-3 text-neutral-500 dark:text-neutral-400
                            -top-4 ltr:left-3 absolute bg-white dark:bg-gray-800 p-1 px-2"
                        >
                            Keywords
                        </label>
                        <input
                            id="keyword"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyUp={handleKeyPress}
                            className="border-2 rounded border-neutral-300 dark:border-neutral-500
                            focus:border-neutral-500 dark:focus:border-neutral-300
                            p-3 flex-1 dark:bg-transparent"
                        />
                    </div>
                    <div className="flex flex-wrap space-x-2">
                        {field.value &&
                            field.value.map((value: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 bg-gray-400/30 p-1 rounded"
                                >
                                    <span>{value}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveValue(index)}
                                        className="text-red-500"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        />
    );
};

export default TagsInput;
