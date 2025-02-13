/* eslint-disable @next/next/no-img-element */
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
import { SafeStore } from "@/app/types";

interface TableProps {
    stores: SafeStore[];
    parent: string;
}

const StoreTable = ({ stores, parent }: TableProps) => {
    const t = useTranslations("table");

    const head = [
        { label: t("logo") },
        { label: t("title") },
        { label: t("name") },
        { label: t("coupons") },
        { label: t("language") },
        { label: t("author") },
        { label: t("status") },
        { label: t("actions") },
    ];

    const [title, setTitle] = useState("");
    const [filteredData, setFilteredData] = useState(stores);
    const [storeId, setStoreId] = useState("");
    const [lang, setLang] = useState("ar");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const confirm = useConfirm();

    function onDelete(id: string) {
        setIsLoading(true);
        axios
            .delete(`/api/${parent}/${id}`)
            .then(() => {
                confirm.onClose();
                toast.success("Done : store deleted Successfully");
                router.refresh();
            })
            .catch((error) => {
                toast.error(
                    error?.response?.data?.error ||
                        "Error : Can't delete this store"
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

    const filteredStores = useMemo(() => {
        let data = stores;

        if (lang !== "all") {
            data = data.filter((store) => store.locale === lang);
        }

        if (title) {
            data = data.filter((store) =>
                store.name.toLowerCase().includes(title.toLowerCase())
            );
        }

        return data;
    }, [lang, title, stores]);

    useEffect(() => {
        setFilteredData(filteredStores);
    }, [filteredStores]);

    return (
        <div>
            <Confirm isLoading={isLoading} onDelete={() => onDelete(storeId)} />
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
                                <TableCell>
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt="store logo"
                                            className="w-10"
                                        />
                                    )}
                                </TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.coupons.length}</TableCell>
                                <TableCell>{item.locale}</TableCell>
                                <TableCell>{item.author.name}</TableCell>
                                <TableCell>
                                    <Status status={item.status} />
                                </TableCell>
                                <TableCell>
                                    <div className=" flex justify-start items-center gap-1">
                                        <Link
                                            href={`${parent}/${item.id}`}
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
                                                setStoreId(item.id);
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
                                        <div
                                            onClick={() => {
                                                router.push(`users/${item.id}`);
                                            }}
                                            title="Preview"
                                            className="rounded text-purple-500  dark:bg-white/10 
                                                        border border-gray-300 dark:border-0
                                                        w-7 h-7 flex justify-center cursor-pointer
                                                        items-center"
                                        >
                                            {/* Remove{" "} */}
                                            <RiShareBoxFill size={16} />
                                        </div>
                                    </div>
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

export const StoreLogo = (url: string) => {
    return <img src={url} alt="store logo" className="w-10 h-10" />;
};

export default StoreTable;
