"use client";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
    MdOutlinePending,
    MdCheckCircleOutline,
    MdErrorOutline,
} from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import { useLocale } from "next-intl";

interface SortingProps {
    data: any[];
    parent: string;
}

const Sorting: FC<SortingProps> = ({ data, parent }) => {
    const [allData, setAllData] = useState<any[]>([]);
    const [active, setActive] = useState<any[]>([]);
    const [pending, setPending] = useState<any[]>([]);
    const [inactive, setInctive] = useState<any[]>([]);
    const [trash, setTrash] = useState<any[]>([]);

    useEffect(() => {
        setAllData(data);
    }, [data]);

    useEffect(() => {
        let activeListings: any[] = data.filter(
            (item: any) => item?.status?.toLowerCase() == "active"
        );

        setActive(activeListings);
    }, [data]);

    useEffect(() => {
        let pendingListings = data.filter(
            (item: any) => item?.status?.toLowerCase() == "pending"
        );
        setPending(pendingListings);
    }, [data]);

    useMemo(() => {
        let inactiveListings = data?.filter(
            (item: any) => item?.status?.toLowerCase() == "inactive"
        );
        setInctive(inactiveListings);
    }, [data]);

    useMemo(() => {
        let trashedListings: any[] = [];
        setTrash(trashedListings);
    }, []);

    return (
        <>
            <div className=" text-xs w-full lg:w-2/3 flex justify-start items-center gap-3">
                <Link
                    href={`${parent}`}
                    className="flex gap-2 hover:bg-slate-100/20 p-2 px-4 rounded-md hover:underline items-center cursor-pointer"
                >
                    <div></div>
                    All ({allData.length || 0})
                </Link>
                <Link
                    href={`${parent}?status=active`}
                    className="flex gap-2 hover:bg-slate-100/20 p-2 px-4 rounded-md hover:underline items-center cursor-pointer"
                >
                    <div>
                        <MdCheckCircleOutline color="#a3e635" size={"20"} />
                    </div>
                    Active:({active.length || 0})
                </Link>
                <Link
                    href={`${parent}?status=pending`}
                    className="flex gap-2 hover:bg-slate-100/20 p-2 px-4 rounded-md hover:underline items-center cursor-pointer"
                >
                    <div>
                        <MdOutlinePending color="#fbbf24" size={"20"} />
                    </div>
                    Pending: ({pending.length || 0})
                </Link>
                <Link
                    href={`${parent}?status=inactive`}
                    className="flex gap-2 hover:bg-slate-100/20 p-2 px-4 rounded-md hover:underline items-center cursor-pointer"
                >
                    <div>
                        <MdErrorOutline color="#dc2626" size={"20"} />
                    </div>
                    Inactive: ({inactive.length || 0})
                </Link>
                <div className="flex gap-2 hover:bg-slate-100/20 p-2 px-4 rounded-md hover:underline items-center cursor-pointer">
                    <div>
                        <FaRegTrashCan color="#0891b2" size={"16"} />
                    </div>
                    Trash: ({trash.length || 0})
                </div>
            </div>
        </>
    );
};

export default Sorting;
