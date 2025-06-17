import { Head } from "@inertiajs/react";
import PasienLayout from "@/Layouts/PasienLayout";
import DataTable from "@/Components/UI/DataTable";

export default function Treatment({ treatments }) {
    const treatmentColumns = [
        {
            header: "Treatment",
            key: "name",
            render: (treatment) => (
                <div className="font-medium text-gray-900">
                    {treatment.name}
                </div>
            ),
        },
        {
            header: "Harga",
            key: "price",
            render: (treatment) => (
                <div className="font-semibold text-gray-900">
                    {treatment.price}
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 font-lexend overflow-hidden">
            <Head title="Treatment - Pasien" />
            <PasienLayout>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 pb-12">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Treatment
                        </h1>
                        <p className="text-gray-600">
                            Daftar layanan perawatan gigi yang tersedia
                        </p>
                    </div>

                    <div className="mb-8">
                        <DataTable
                            data={treatments}
                            columns={treatmentColumns}
                            itemsPerPage={10}
                            showPagination={true}
                            className="max-w-4xl"
                        />
                    </div>
                </div>
            </PasienLayout>
        </div>
    );
}
