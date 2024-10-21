/* eslint-disable @next/next/no-img-element */
import React from "react";

const NoData = () => {
    return (
        <>
            <div className="bg-white dark:bg-gray-700 text-lg font-semibold 
            text-gray-400 rounded-lg shadow my-6 p-6 w-full h-[300px] 
            flex justify-center items-center flex-col
            ">
                <img
                    src="/images/No-Results-Found-color.svg"
                    alt="no-data"
                    width={160}
                />
                <h1>There are no results</h1>
            </div>
        </>
    );
};

export default NoData;
