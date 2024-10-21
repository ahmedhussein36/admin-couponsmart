import React from "react";

const Label = ({ label, color }: { label: string; color: string }) => {
    return (
        <div
            className={`text-xs font-semibold py-1 px-3 rounded-md text-neutral-800 ${color}`}
        >
            {label}
        </div>
    );
};

export default Label;
