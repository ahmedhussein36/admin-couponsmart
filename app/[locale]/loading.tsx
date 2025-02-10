import { Spinner } from "@/components/ui/spinner";
import React from "react";

const loading = () => {
    return (
        <div className="w-full h-full m-auto flex flex-col justify-center  items-center">
            <div className="w-16 h-16 bg-white dark:bg-zinc-800 p-3 rounded-lg flex justify-center items-center">
                <Spinner size={"lg"} className=" bg-black dark:bg-white mx-2" />
            </div>
        </div>
    );
};

export default loading;
