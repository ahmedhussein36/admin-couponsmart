import React from "react";

const Status = ({ status }: { status: string }) => {
    const formatedStatus = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const statusColor = (status: string) => {
        switch (status) {
            case "published":
                return "text-green-500 bg-lime-200/50 dark:bg-white/10";
            case "draft":
                return "text-orange-400 bg-orange-200/50 dark:bg-white/10";
            case "trashed":
                return "text-red-600 bg-red-200/50 dark:bg-white/10";
        }
    };
    return (
        <span
            className={`
              ${statusColor(status)}
                flex w-fit
                justify-center 
                items-start p-1 px-2
                rounded-r-full 
                text-xs font-medium
        `}
        >
            {formatedStatus(status)}
        </span>
    );
};

export default Status;
