import React, { ReactNode } from "react";

export const TableRow = ({ children }: { children: ReactNode }) => {
    return <tr className=" p-2">{children}</tr>;
};

export const TableCell = ({ children }: { children: ReactNode }) => {
    return <td className=" border-b-2 py-3">{children}</td>;
};

export const TableHead = ({ children }: { children: ReactNode }) => {
    return <thead className="w-full text-sm ">{children}</thead>;
};

export const TableBody = ({ children }: { children: ReactNode }) => {
    return <tbody className="table-body w-full py-2 ">{children}</tbody>;
};
