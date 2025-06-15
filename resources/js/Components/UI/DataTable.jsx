import { useState } from "react";
import Pagination from "./Pagination";

export default function DataTable({
    data = [],
    columns = [],
    itemsPerPage = 10,
    className = "",
    showPagination = true,
    getRowClassName = null,
}) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div
            className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${className}`}
        >
            <div className="overflow-hidden">
                <table className="w-full">
                    {columns.length > 0 && (
                        <thead className="bg-gray-50/50">
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className="px-6 py-4 text-left text-sm font-semibold text-gray-900 first:rounded-tl-2xl last:rounded-tr-2xl"
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    )}

                    <tbody className="divide-y divide-gray-100">
                        {currentData.map((item, rowIndex) => {
                            const baseClassName =
                                "hover:bg-gray-50/50 transition-colors";
                            const customClassName = getRowClassName
                                ? getRowClassName(item)
                                : "";
                            const rowClassName = customClassName
                                ? `${baseClassName} ${customClassName}`
                                : baseClassName;

                            return (
                                <tr key={rowIndex} className={rowClassName}>
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-6 py-4 text-sm text-gray-700"
                                        >
                                            {column.render
                                                ? column.render(item, rowIndex)
                                                : item[column.key]}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {data.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-2">
                            <svg
                                className="w-12 h-12 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3"
                                />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Tidak ada data tersedia
                        </p>
                    </div>
                )}
            </div>

            {showPagination && totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            Showing {startIndex + 1} to{" "}
                            {Math.min(endIndex, totalItems)} of {totalItems}{" "}
                            records
                        </div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
