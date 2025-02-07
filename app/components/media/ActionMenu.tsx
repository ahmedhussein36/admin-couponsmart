"use client";

import type React from "react";
import { MoreVertical, Copy, Download, FileText, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type ActionMenuProps = {
    onCopy: () => void;
    onDownload: () => void;
    onDelete: () => void;
    onDetails: () => void;
};

const ActionMenu: React.FC<ActionMenuProps> = ({
    onCopy,
    onDownload,
    onDelete,
    onDetails,
}) => {
    const options = [
        { name: "Copy Image URL", icon: Copy, onClick: onCopy },
        { name: "Download", icon: Download, onClick: onDownload },
        { name: "Details", icon: FileText, onClick: onDetails },
        { name: "Delete", icon: Trash, onClick: onDelete },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className=" flex justify-center items-center p-2 w-8 h-8 rounded-full bg-gray-800/50 text-white hover:bg-gray-700 focus:bg-gray-700"
                >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-52 bg-black/70 border-white/5"
            >
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option.name}
                        onClick={option.onClick}
                        className="flex items-center gap-2 py-1.5 px-3 focus:bg-white/20 cursor-pointer focus:text-white text-white"
                    >
                        <option.icon className="h-5 w-5 text-white/60" />
                        {option.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionMenu;
