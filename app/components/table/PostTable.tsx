"use client";
import React, { useEffect, useMemo, useState } from "react";
import { TableBody, TableCell, TableHead, TableRow } from "./Table";
import { useTranslations } from "next-intl";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import useConfirm from "@/app/hooks/useConfirm";
import Confirm from "@/app/components/Confirm";
import { RiShareBoxFill } from "react-icons/ri";
import SearchInput from "../inputs/SearchInput";
import LangaugeTaps from "../buttons/LangaugeTaps";
import NoData from "../NoData";
import Status from "../coupons/Status";
import { Link } from "@/i18n/routing";
import { SafePosts } from "@/app/types";
import { getTimePassed } from "@/app/utils/getTimePassed";

interface TableProps {
    posts: SafePosts[];
}

const PostTable = ({ posts }: TableProps) => {
    const t = useTranslations("table");

    const head = [
        { label: t("title") },
        { label: t("language") },
        { label: t("author") },
        { label: t("status") },
        { label: t("actions") },
        // { label: t("time") },
    ];

    const [title, setTitle] = useState("");
    const [filteredData, setFilteredData] = useState(posts);
    const [postId, setpostId] = useState("");
    const [lang, setLang] = useState("ar");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const confirm = useConfirm();

    function onDelete(id: string) {
        setIsLoading(true);
        axios
            .delete(`/api/posts/${id}`)
            .then(() => {
                confirm.onClose();
                toast.success("Done : Post deleted Successfully");
                router.refresh();
            })
            .catch((error) => {
                toast.error(
                    error?.response?.data?.error ||
                        "Error : Can't delete this post"
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const languageChange = (lang: string) => {
        setLang(lang);
    };

    const filteredposts = useMemo(() => {
        let data = posts;

        if (lang !== "all") {
            data = data.filter((post) => post.locale === lang);
        }

        if (title) {
            data = data.filter((post) =>
                post.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        return data;
    }, [lang, title, posts]);

    useEffect(() => {
        setFilteredData(filteredposts);
    }, [filteredposts]);

    return (
        <div>
            <Confirm isLoading={isLoading} onDelete={() => onDelete(postId)} />
            <div className="w-full grid grid-cols-3 justify-items-end items-end">
                <SearchInput
                    Placeholder={t("search")}
                    onChange={handleSearch}
                />
                <LangaugeTaps languageChange={languageChange} />
            </div>
            {filteredData.length ? (
                <table className="mt-4 border-collapse overflow-hidden rounded-lg table w-full bg-white dark:bg-gray-700/50">
                    <TableHead>
                        <TableRow>
                            {head.map((item, index) => (
                                <TableCell key={item.label}>
                                    {item.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.locale}</TableCell>
                                <TableCell>{item.author.name}</TableCell>
                                <TableCell>
                                    <Status status={item?.status} />
                                </TableCell>
                                <TableCell>
                                    <div className=" flex justify-start items-center gap-1">
                                        <Link
                                            href={`posts/${item.id}`}
                                            title="Edit"
                                            className="rounded text-blue-500 dark:border-0 dark:bg-white/10 
                                                        border border-gray-300
                                                        cursor-pointer w-7 h-7 transition-all
                                                        flex justify-center items-center"
                                        >
                                            {/* Edit  */}
                                            <FaEdit size={14} />
                                        </Link>
                                        <div
                                            onClick={() => {
                                                setpostId(item.id);
                                                confirm.onOpen();
                                            }}
                                            title="Delete"
                                            className="rounded text-red-500 dark:bg-white/10 
                                                        border border-gray-300 dark:border-0
                                                        w-7 h-7 flex justify-center cursor-pointer
                                                        items-center"
                                        >
                                            {/* Remove{" "} */}
                                            <FiTrash2 size={16} />
                                        </div>
                                        <Link
                                            href={`#`}
                                            title="Preview"
                                            className="rounded text-purple-500  dark:bg-white/10 
                                                        border border-gray-300 dark:border-0
                                                        w-7 h-7 flex justify-center cursor-pointer
                                                        items-center"
                                        >
                                            {/* Remove{" "} */}
                                            <RiShareBoxFill size={16} />
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span
                                        dir="ltr"
                                        className="text-left italic text-xs text-muted-foreground"
                                    >
                                        {getTimePassed(item.createdAt)}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </table>
            ) : (
                <NoData />
            )}
        </div>
    );
};

export default PostTable;
