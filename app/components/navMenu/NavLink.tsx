import { Link } from "@/i18n/routing";
import React, { FC } from "react";

interface NavLinkProps {
    path: string;
    icon: React.ReactNode;
    isCollaps: boolean;
    label: string;
    isActive: boolean;
}

export const NavLink: FC<NavLinkProps> = ({
    path,
    icon,
    isCollaps,
    label,
    isActive,
}) => {
    return (
        <Link
            href={path}
            className={`
                ${
                    isActive
                        ? " font-semibold bg-lime-400  hover:bg-lime-400 dark:text-neutral-800"
                        : "hover:bg-neutral-200 dark:hover:bg-neutral-700 "
                }
                ${
                    isCollaps
                        ? "p-2 rounded-lg gap-0"
                        : "justify-start rounded-lg px-4 py-2 gap-2"
                }
                text-black dark:text-neutral-200 
                flex items-center  
                w-full text-sm
                transition-all
            `}
        >
            <div className="">{icon}</div>
            <div
                className={` 
                    overflow-hidden
                    ${
                        !isCollaps ? "opacity-100 w-full" : "w-0 opacity-0"
                    } "hidden font-medium"`}
            >
                {label}
            </div>
        </Link>
    );
};
export default NavLink;
