"use client";
import React, { useState } from "react";
import CollapsButton from "./CollapsButton";
import NavLink from "./NavLink";
import { useNavMenuList } from "@/app/utils/useNavMenuList";
import { useSelectedLayoutSegment } from "next/navigation";

export function MainSidebar() {
    const [isCollaps, setisCollaps] = useState(false);
    const navMenu = useNavMenuList();
    const segment = useSelectedLayoutSegment();

    const activeNavLink = (path: string | null) => {
        let route;
        path === "/" ? (route = null) : (route = path);
        if (segment === route) return true;
        return false;
    };

    return (
        <div
            className={`
                fixed top-0 z-50" overflow-hidden h-full min-w-[70px] py-4 px-4
                flex transition-all duration-300 flex-col justify-start items-start gap-4
                bg-white dark:bg-gray-900/50 dark:shadow-none  
                shadow-slate-300 shadow-md
                ${!isCollaps ? "w-[160px]" : "w-[80px]"}
            `}
        >
            <div className=" flex justify-start px-2 items-center w-full mt-1 mb-2">
                <CollapsButton
                    toggleOpen={() =>
                        setisCollaps((value) =>
                            value === false ? true : false
                        )
                    }
                />
            </div>

            <div className=" flex flex-col justify-center items-start gap-2">
                {navMenu.map((item, index) => (
                    <NavLink
                        key={item.id}
                        label={item.label}
                        path={`/${item.path}`}
                        icon={item.icon}
                        isActive={activeNavLink(item.path) as boolean}
                        isCollaps={isCollaps}
                    />
                ))}
            </div>
        </div>
    );
}
