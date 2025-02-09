import { Spinner } from "@/components/ui/spinner";
import React from "react";

const loading = () => {
    return (
        <div className="w-full h-full m-auto flex flex-col justify-center  items-center">
            <div className="w-20 h-20 bg-zinc-800 p-3 rounded-lg flex justify-center items-center">
                <Spinner size={"lg"} className=" bg-lime-400 mx-2" />
            </div>
        </div>
    );
};

export default loading;
