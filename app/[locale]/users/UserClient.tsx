"use client";
import { SafeAdmin } from "@/app/types";
import ClientOnly from "@/app/components/ClientOnly";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import SearchInput from "@/app/components/inputs/SearchInput";
import { LuSearch } from "react-icons/lu";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Confirm from "@/app/components/Confirm";
import useConfirm from "@/app/hooks/useConfirm";
import EmptyState from "@/app/components/EmptyState";
import UserFilter from "@/app/components/UserFilter";
import { toast } from "react-toastify";

const userStatus = ["active", "pending", "inactive"];
const userRoles = ["admin", "manager", "editor", "author", "user"];

interface Props {
    admins: SafeAdmin[];
}

const CompoundClient: React.FC<Props> = ({ admins }) => {
    const [title, setTitle] = useState("");
    const [filteredData, setFilteredData] = useState<SafeAdmin[]>(admins);
    const [userId, setUserId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const confirm = useConfirm();

    function onDelete(id: string) {
        setIsLoading(true);
        axios
            .delete(`/api/register/${id}`)
            .then(() => {
                confirm.onClose();
                toast.success("Done : user deleted Successfully");
                router.refresh();
            })
            .catch((error) => {
                toast.error(
                    error?.response?.data?.error ||
                        "Error : Can't delete this user"
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (title !== "") {
            const data = admins.filter((item) => {
                return item.name.toLocaleLowerCase().includes(title);
            });
            setFilteredData(data);
        } else {
            setFilteredData(admins);
        }
    }, [title, admins]);

    const StutusColor = useCallback((status: string | null) => {
        if (status === "active")
            return (
                <>
                    <span className="bg-lime-400 text-black text-center font-semibold text-xs rounded-full py-1 px-3 ">
                        Active
                    </span>
                </>
            );
        if (status === "pending")
            return (
                <>
                    <span className="bg-orange-300 text-black text-center font-semibold text-xs rounded-full py-1 px-3 ">
                        Pending
                    </span>
                </>
            );
        if (status === "inactive")
            return (
                <>
                    <span className="bg-red-50 text-red-400 text-center text-base font-semibold rounded-full py-1 px-3 ">
                        Inactive
                    </span>
                </>
            );
    }, []);

    return (
        <>
            <Confirm isLoading={isLoading} onDelete={() => onDelete(userId)} />

            <div className=" w-full flex justify-start items-end gap-4 my-8">
                <div className="w-1/4 relative">
                    <SearchInput
                        value={title}
                        onChange={(e) => setTitle(e.target.value as any)}
                        Placeholder="Search for users"
                    />
                    <div className=" absolute top-3 right-4">
                        <LuSearch size={20} color="#757575" />
                    </div>
                </div>
                <div className="w-1/3 flex justify-center items-center ">
                    {/* <UserFilter userRoles={userRoles as any[]} /> */}
                </div>
            </div>

            <div
                className="
                        pt-2
                        mt-2
                        w-full
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        gap-8
                        "
            >
                <ClientOnly>
                    {!filteredData.length ? (
                        <EmptyState />
                    ) : (
                        <div className="overflow-x-auto w-full bg-white  dark:bg-gray-700/50 rounded-lg p-6">
                            <table className=" text-sm w-full border-collapse">
                                <thead className="dark:text-neutral-300 text-neutral-400 border-b dark:border-neutral-500">
                                    <tr className="font-normal">
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y dark:divide-neutral-500 ">
                                    {filteredData.map((item: any) => (
                                        <tr
                                            key={item.id}
                                            className=" p-2 py-4 hover:bg-slate-400/10"
                                        >
                                            <td>{item.name}</td>
                                            <td>{item.username || "- -"}</td>
                                            <td>{item?.email}</td>
                                            <td>{item.role}</td>
                                            <td>
                                                {StutusColor(item?.status) ||
                                                    "- -"}
                                            </td>
                                            <td className=" flex justify-start items-center gap-3">
                                                <div
                                                    onClick={() => {
                                                        router.push(
                                                            `users/${item.id}`
                                                        );
                                                    }}
                                                    title="Edit"
                                                    className=" hover:bg-blue-500 bg-blue-600 rounded-full
                                                        cursor-pointer  p-2 text-white transition-all
                                                        flex gap-1 justify-center items-center"
                                                >
                                                    {/* Edit  */}
                                                    <FaEdit size={16} />
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setUserId(item.id);
                                                        confirm.onOpen();
                                                    }}
                                                    title="Delete"
                                                    className=" hover:bg-red-500 bg-red-600 rounded-full
                                                                p-2 flex gap-1 justify-center cursor-pointer
                                                                items-center"
                                                >
                                                    {/* Remove{" "} */}
                                                    <FiTrash2
                                                        color="#dedede"
                                                        size={16}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </ClientOnly>
            </div>
        </>
    );
};
export default CompoundClient;
