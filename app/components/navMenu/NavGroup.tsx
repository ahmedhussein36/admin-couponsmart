import React from 'react'


interface NavGroupProps {
    title?: string
    children: React.ReactNode
}

const NavGroup = ({ title, children } : NavGroupProps) => {
    return (
        <div className=" flex flex-col gap-3 w-full py-1 border-t border-slate-300/50 justify-center items-start fixed:top-0">
            <div className=" px-8 font-semibold text-slate-400 ">{title}</div>
            <div className=" w-full flex flex-col justify-between items-start gap-2">
                {children}
            </div>
        </div>
    );
}

export default NavGroup