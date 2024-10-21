"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import TableSkelton from "../TableSkelton";
import { TableBody, TableCell, TableHead, TableRow } from "../table/Table";
import CountryFlag from "react-country-flag";
import NoData from "../NoData";

interface TableProps {
    coupons: any[];
}

const CouponTable = ({ coupons }: TableProps) => {
    const t = useTranslations("table");

    const head = [
        { label: t("title") },
        { label: t("type") },
        { label: t("store") },
        { label: t("countries") },
        { label: t("language") },
        { label: t("code") },
        { label: t("actions") },
    ];

    const [title, setTitle] = useState("");
    const [filteredData, setFilteredData] = useState(coupons);
    const [couponId, setCouponId] = useState("");
    const [lang, setLang] = useState("ar");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const confirm = useConfirm();

    function onDelete(id: string) {
        setIsLoading(true);
        axios
            .delete(`/api/coupons/${id}`)
            .then(() => {
                confirm.onClose();
                toast.success("Done : Coupon deleted Successfully");
                router.refresh();
            })
            .catch((error) => {
                toast.error(
                    error?.response?.data?.error ||
                        "Error : Can't delete this coupon"
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

    const filteredCoupons = useMemo(() => {
        let data = coupons;

        if (lang !== "all") {
            data = data.filter((coupon) => coupon.locale === lang);
        }

        if (title) {
            data = data.filter((coupon) =>
                coupon.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        return data;
    }, [coupons, lang, title]);

    useEffect(() => {
        setFilteredData(filteredCoupons);
    }, [filteredCoupons]);

    return (
        <div>
            <Confirm
                isLoading={isLoading}
                onDelete={() => onDelete(couponId)}
            />
            <div className="w-full grid grid-cols-3 justify-items-end items-end">
                <SearchInput
                    Placeholder={t("search")}
                    onChange={handleSearch}
                />
                <LangaugeTaps languageChange={languageChange} />
            </div>
            {filteredData.length ? (
                <table className="mt-4 border-collapse overflow-hidden rounded-lg table w-full bg-white dark:bg-transparent">
                    <TableHead>
                        <TableRow>
                            {head.map((item, index) => (
                                <th key={item.label}>{item.label}</th>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCoupons &&
                            filteredData.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.Store.name}</TableCell>
                                    <TableCell>
                                        {item.countries.map((item: any) => (
                                            <CountryFlag
                                                title={item.value}
                                                className="mx-2"
                                                key={item.id}
                                                countryCode={item.flag}
                                                svg
                                                style={{
                                                    width: "18px",
                                                    height: "18px",
                                                }}
                                            />
                                        ))}
                                    </TableCell>
                                    <TableCell>{item.locale}</TableCell>
                                    <TableCell>{item.auther.name}</TableCell>
                                    <TableCell>
                                        <div className=" flex justify-start items-center gap-3">
                                            <div
                                                onClick={() => {
                                                    router.push(
                                                        `users/${item.id}`
                                                    );
                                                }}
                                                title="Edit"
                                                className="rounded border- text-blue-500
                                                        cursor-pointer  p-1 transition-all
                                                        flex justify-center items-center"
                                            >
                                                {/* Edit  */}
                                                <FaEdit size={14} />
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setCouponId(item.id);
                                                    confirm.onOpen();
                                                }}
                                                title="Delete"
                                                className="rounded border- text-red-500 hover:bg-red-50
                                                                p-1 flex justify-center cursor-pointer
                                                                items-center"
                                            >
                                                {/* Remove{" "} */}
                                                <FiTrash2 size={16} />
                                            </div>
                                            <div
                                                onClick={() => {
                                                    router.push(
                                                        `users/${item.id}`
                                                    );
                                                }}
                                                title="Preview"
                                                className="rounded text-purple-500
                                                                p-1 flex justify-center cursor-pointer
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

export default CouponTable;
