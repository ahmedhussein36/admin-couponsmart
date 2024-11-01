"use client";
import React, { ReactNode } from "react";
import { GrNotification } from "react-icons/gr";
import LangSwitcher from "./LangSwitcher";
import ThemeToggle from "./ThemeToggle";
import UserProfile from "../profile/UserProfile";
import { ModeToggle } from "./ModeToggle";

export const HeaderItem = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className="hover:text-lime-400 flex justify-center items-center
      py-1 px-2 cursor-pointer transition-all "
        >
            {children}
        </div>
    );
};

const Header = () => {
    return (
        <header
            className=" 
              w-full
              flex justify-end items-center
              bg-black p-2 h-10
              "
        >
            <div className="flex justify-between px-8 items-center gap-3 text-neutral-200 duration-300">
                <HeaderItem>
                    <ModeToggle />
                </HeaderItem>
                <HeaderItem>
                    <GrNotification size={18} />
                </HeaderItem>
                <HeaderItem>
                    <UserProfile />
                </HeaderItem>
                <LangSwitcher />
            </div>
        </header>
    );
};

export default Header;
