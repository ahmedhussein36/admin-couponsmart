import React from "react";
const TableSkelton = (props: any) => {
    const rows = 1;
    return (
        <div className="my-5 w-full flex flex-col justify-start items-start gap-0">
            <div
                className="w-full flex justify-center items-center p-6 
                rounded-lg h-64 bg-white dark:bg-gray-700/50"
            >
                Loading Data...
            </div>
            <div className="Loader w-full"></div>
        </div>
    );
};

export default TableSkelton;
