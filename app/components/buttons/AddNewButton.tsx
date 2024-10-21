import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const AddNewButton = ({ link , label}: { link: string , label: string}) => {
    const t = useTranslations("buttons")
    return (
        <Link
            className="py-2 px-4 bg-gray-600 flex justify-center items-center gap-1 rounded-md text-white text-sm hover:bg-gray-700"
            href={link || "/"}
        >
            <AiOutlinePlus /> <span>{label}</span>
        </Link>
    );
};

export default AddNewButton;
