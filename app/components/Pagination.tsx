import { useState } from "react";

interface PaginationProps {
    totalItems: number;
    defaultPageSize?: number;
    itemsPerPageOptions?: number[];
    onChangePage: (page: number) => void;
    onChangeRowsPerPage: (number: number) => void;
}

const Pagination = ({
    totalItems,
    defaultPageSize = 20,
    itemsPerPageOptions = [10, 20, 50, 100],
    onChangePage,
    onChangeRowsPerPage,
}: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(defaultPageSize);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        onChangePage(page);
    };

    const handleItemsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newItemsPerPage = Number(event.target.value);
        setItemsPerPage(newItemsPerPage);
        onChangeRowsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page with new page size
    };

    return (
        <div className="my-8 py-8 flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex space-x-2 mb-4">
                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (
                    <button
                        key={page}
                        disabled={currentPage === page}
                        onClick={() => handlePageChange(page)}
                        className={` transition-all border  px-4 py-2 text-sm font-medium rounded-md ${
                            currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500 hover:bg-blue-100"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <div>
                <label className="mx-4">Show Rows</label>
                <select
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                    className="mt-2 border border-gray-300 text-gray-700 rounded-md p-2 hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    {itemsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Pagination;
