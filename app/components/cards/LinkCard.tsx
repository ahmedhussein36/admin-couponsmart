import { Link } from "@/i18n/routing";
import React, { ReactElement } from "react";

const LinkCard = ({
    label,
    link,
    icon,
    color,
}: {
    label?: string;
    link: string;
    color?: string;
    icon?: ReactElement;
}) => {
    return (
        <div className=" w-full">
            <Link
                href={link}
                className=" flex flex-col w-full
                border rounded-lg p-6 bg-white dark:text-neutral-200
                justify-center items-center gap-3 
                hover:border-neutral-500 dark:bg-gray-700/50 dark:hover:bg-gray-700/80
                dark:border-neutral-700/0 transition-all
                "
            >
                <div className={`text-${color}-400 opacity-1 `}>{icon}</div>
                <span className=" text-sm">{label} </span>
            </Link>
        </div>
    );
};

export default LinkCard;
