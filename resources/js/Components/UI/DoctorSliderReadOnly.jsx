import { useState } from "react";
import DoctorCard from "./DoctorCard";

export default function DoctorSliderReadOnly({ doctors }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(doctors.length / itemsPerPage);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const getCurrentItems = () => {
        const startIndex = currentIndex * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return doctors.slice(startIndex, endIndex);
    };

    const currentItems = getCurrentItems();

    return (
        <div className="bg-primary backdrop-blur-sm rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6 ">
                <h2 className="text-3xl font-semibold text-white">
                    Profil Dokter Gigi
                </h2>

                <div className="flex items-center gap-2">
                    <button
                        onClick={prevSlide}
                        disabled={totalPages <= 1}
                        className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    <span className="text-sm text-gray-500 px-2">
                        {currentIndex + 1} / {totalPages}
                    </span>

                    <button
                        onClick={nextSlide}
                        disabled={totalPages <= 1}
                        className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <svg
                            className="w-4 h-4 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {currentItems.map((item) => {
                    if (item.isAddNew) {
                        return (
                            <div
                                key="add-new"
                                onClick={onAddNew}
                                className="bg-vanilla rounded-2xl p-4 border-2 border-dashed border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-colors cursor-pointer flex items-center justify-center min-h-[140px]"
                            >
                                <div className="text-center">
                                    <svg
                                        className="w-8 h-8 text-gray-400 mx-auto mb-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-500">
                                        Tambah Dokter
                                    </p>
                                </div>
                            </div>
                        );
                    }

                    return <DoctorCard key={item.id} doctor={item} />;
                })}

                {Array.from(
                    { length: itemsPerPage - currentItems.length },
                    (_, index) => (
                        <div key={`empty-${index}`} className="invisible">
                            <div className="bg-gray-100 rounded-2xl p-4 min-h-[140px]"></div>
                        </div>
                    )
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentIndex
                                    ? "bg-orange-600"
                                    : "bg-gray-300 hover:bg-gray-400"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
