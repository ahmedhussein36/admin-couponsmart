import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { BiEdit, BiTrash } from "react-icons/bi";
import { LuDelete } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { TbBrush } from "react-icons/tb";

interface TableProps {
    categories: any[];
}

const CategoryTable = ({ categories }: TableProps) => {
    const t = useTranslations();
    return (
        <div className="p-4 bg-white dark:bg-gray-700/40 rounded-lg">
            <table className="w-full border-collapse text-sm">
                <thead className=" border-b dark:border-neutral-500">
                    <tr className="text-start text-neutral-400">
                        <th>{t("table.title")}</th>
                        <th>{t("table.posts")}</th>
                        <th className="text-end">{t("table.actions")}</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr
                            key={category.id}
                            className=" border-b dark:border-neutral-500 transition-all hover:bg-black/5 dark:hover:bg-black/15"
                        >
                            <td>{category.title}</td>
                            <td>
                                <Link
                                    href={`posts?categoryId=${category.id}`}
                                    className=" hover:underline hover:text-blue-600"
                                >
                                    {category?.posts.length}
                                </Link>
                            </td>
                            <td className=" flex justify-end items-center gap-3">
                                <button
                                    title="Edit"
                                    className="bg-blue-500 w-6 h-6
                                            transition-all flex 
                                            justify-center 
                                            items-center 
                                            rounded-full 
                                            hover:bg-blue-600 
                                            text-white  py-1"
                                >
                                    <BiEdit size={16} />
                                </button>
                                <button
                                    title="Delete"
                                    className="bg-red-500 w-6 h-6
                                            transition-all 
                                            flex justify-center 
                                            items-center 
                                            rounded-full 
                                            hover:bg-red-600 
                                            text-white
                                            font-bold py-2"
                                >
                                    <BiTrash size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryTable;
