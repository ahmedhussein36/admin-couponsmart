import React from "react";
import { useFormContext, Controller } from "react-hook-form";

interface SwitchProps {
    name: string;
    label?: string;
}

const Switch: React.FC<SwitchProps> = ({ name, label }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div
                    className="w-full flex justify-between items-center py-2 cursor-pointer"
                    onClick={() => field.onChange(!field.value)}
                >
                    <label>{label}</label>
                    <div
                        className={`${
                            field.value
                                ? "bg-green-400"
                                : "dark:bg-gray-200/50 bg-gray-200"
                        } overflow-hidden relative w-10 h-6 rounded-full flex justify-center items-center transition-all duration-200 ease-in-out`}
                    >
                        <div
                            className={`${
                                field.value ? "translate-x-2" : "-translate-x-2"
                            } bg-white shadow-md relative transition-all duration-200 ease-in-out rounded-full w-5 h-5`}
                        ></div>
                    </div>
                </div>
            )}
        />
    );
};

export default Switch;
