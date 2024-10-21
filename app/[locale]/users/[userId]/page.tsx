import getUserById from "@/app/actions/getUserById";
import React from "react";
import EditUser from "./EditUser";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

interface UserParams {
    userId: string;
}

const UserPage = async ({ params }: { params: UserParams }) => {
    // const currentUser = await getCurrentUser();
    // if (!currentUser) {
    //     redirect("/login");
    // }

    // if (currentUser?.role?.toLocaleLowerCase() !== "admin") {
    //     return redirect("/");
    // }

    const user = await getUserById(params);

    return (
        <div>
            <title>Edit user info</title>
            <EditUser user={user as any} />
        </div>
    );
};

export default UserPage;
