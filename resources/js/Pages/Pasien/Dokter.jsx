import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import PasienLayout from "@/Layouts/PasienLayout";
import DoctorSlider from "@/Components/UI/DoctorSliderReadOnly";
import DataTable from "@/Components/UI/DataTable";

export default function Dokter({ dokters, search }) {
    const [searchTerm, setSearchTerm] = useState(search || "");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                route("pasien.dokter"),
                { search: searchTerm },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                }
            );
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);
    const scheduleColumns = [
        {
            header: "Nama Dokter Gigi",
            key: "name",
            render: (doctor) => (
                <div className="font-medium text-gray-900">{doctor.name}</div>
            ),
        },
        {
            header: "Jadwal",
            key: "schedule",
            render: (doctor) => (
                <div className="text-gray-600">{doctor.schedule}</div>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 font-lexend overflow-hidden">
            <Head title="Dokter Gigi - Pasien" />
            <PasienLayout>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 pb-12">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Dokter Gigi
                        </h1>
                        <p className="text-gray-600">
                            Temui tim dokter gigi profesional kami
                        </p>
                    </div>

                    <div className="mb-8">
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-5 w-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari nama dokter gigi..."
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <svg
                                        className="h-4 w-4 text-gray-400 hover:text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                        {searchTerm && (
                            <p className="mt-2 text-sm text-gray-600">
                                {dokters && dokters.length > 0
                                    ? `Menampilkan ${dokters.length} hasil untuk "${searchTerm}"`
                                    : `Tidak ada hasil untuk "${searchTerm}"`}
                            </p>
                        )}
                    </div>

                    <div className="mb-12">
                        <DoctorSlider doctors={dokters} />
                    </div>

                    <div>
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Jadwal Dokter Gigi
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md font-medium">
                                    Cari dokter gigi
                                </span>
                            </div>
                        </div>

                        <DataTable
                            data={dokters}
                            columns={scheduleColumns}
                            itemsPerPage={10}
                            showPagination={true}
                        />
                    </div>
                </div>
            </PasienLayout>
        </div>
    );
}
