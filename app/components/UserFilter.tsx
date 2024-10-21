"use client";

import { FC, useCallback, useState } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

interface FilterProps {
    userRoles: any[];
}

const UserFilter: FC<FilterProps> = ({ userRoles }) => {
    const [role, setRole] = useState<string>("");

    const router = useRouter();
    const params = useSearchParams();

    const onSubmit = useCallback(async () => {
        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        let updatedQuery: any = {
            ...currentQuery,
            role: role,
            // status: status,
        };

        const url = qs.stringifyUrl(
            {
                url: `users`,
                query: updatedQuery,
            },
            { skipNull: true }
        );

        router.push(url);
    }, [params, role, router]);

    const handelChange = useCallback(
        (e: any) => {
            if (e.target.value !== "All") setRole(e.target.value);
            onSubmit();
        },
        [onSubmit]
    );

    return (
        <div className="w-full text-sm justify-start flex flex-col gap-2">
            <label>Filter by role</label>
            <select
                value={role}
                onChange={(e) => {
                    handelChange(e);
                }}
                className=" w-full rounded-md p-2 border-2 dark:bg-gray-800 dark:border-neutral-500"
            >
                <option value={"All"}>All</option>
                {userRoles.map((role, i) => (
                    <option className="" key={i} value={role}>
                        {role}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default UserFilter;
