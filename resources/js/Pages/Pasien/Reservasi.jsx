import { Head, useForm, router } from "@inertiajs/react";
import { useState } from "react";
import PasienLayout from "@/Layouts/PasienLayout";
import Button from "@/Components/UI/Button";

export default function Reservasi({
    treatments,
    isAuthenticated,
    user,
    hasExistingAppointment,
}) {
    const [selectedTreatment, setSelectedTreatment] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const { data, setData, post, processing, errors, reset } = useForm({
        nama_lengkap: user?.name || "",
        umur: "",
        treatment_id: "",
    });

    const handleTreatmentSelect = (treatment) => {
        setSelectedTreatment(treatment.name);
        setData("treatment_id", treatment.id);
        setShowDropdown(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.nama_lengkap || !data.umur || !data.treatment_id) {
            setMessage({
                type: "error",
                text: "Mohon lengkapi semua field yang diperlukan.",
            });
            return;
        }

        post(route("pasien.reservasi.submit"), {
            onStart: () => {
                setIsSubmitting(true);
                setMessage({ type: "", text: "" });
            },
            onSuccess: () => {
                setMessage({
                    type: "success",
                    text: "Reservasi berhasil dibuat! Kami akan menghubungi Anda segera.",
                });
                reset();
                setSelectedTreatment("");

                setTimeout(() => {
                    window.location.href = route("pasien.dashboard");
                }, 2000);
            },
            onError: (errors) => {
                console.error("Validation errors:", errors);

                if (errors.nama_lengkap || errors.umur || errors.treatment_id) {
                    setMessage({
                        type: "error",
                        text: "Mohon periksa kembali data yang dimasukkan.",
                    });
                } else {
                    setMessage({
                        type: "error",
                        text: "Terjadi kesalahan saat memproses reservasi. Silakan coba lagi.",
                    });
                }
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 font-lexend overflow-hidden">
            <Head title="Reservasi - Pasien" />
            <PasienLayout>
                <div
                    className="relative z-10 flex items-center justify-center lg:ml-16 px-4 sm:px-6 lg:px-8 py-8 pt-20 pb-12"
                    style={{ minHeight: "calc(100vh - 0px)" }}
                >
                    <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="w-full max-w-md lg:max-w-md">
                            <div className="bg-[#B8A082] rounded-3xl p-8 shadow-lg">
                                <div className="border-2 border-dashed border-white/30 rounded-2xl p-6">
                                    {hasExistingAppointment && (
                                        <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-5 h-5 text-yellow-600 mr-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <div>
                                                    <h4 className="text-sm font-medium text-yellow-800">
                                                        Perhatian
                                                    </h4>
                                                    <p className="text-sm text-yellow-700">
                                                        Anda sudah memiliki
                                                        reservasi yang sedang
                                                        diproses. Mohon tunggu
                                                        konfirmasi dokter.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Nama Lengkap
                                            </label>
                                            <input
                                                type="text"
                                                value={data.nama_lengkap}
                                                onChange={(e) =>
                                                    setData(
                                                        "nama_lengkap",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Masukan nama lengkap Anda"
                                                className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none"
                                                required
                                            />
                                            {errors.nama_lengkap && (
                                                <p className="mt-1 text-sm text-red-200">
                                                    {errors.nama_lengkap}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Umur
                                            </label>
                                            <input
                                                type="number"
                                                value={data.umur}
                                                onChange={(e) =>
                                                    setData(
                                                        "umur",
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Masukan umur Anda"
                                                className="w-full px-4 py-3 rounded-lg border-0 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white/50 focus:outline-none"
                                                required
                                            />
                                            {errors.umur && (
                                                <p className="mt-1 text-sm text-red-200">
                                                    {errors.umur}
                                                </p>
                                            )}
                                        </div>

                                        <div className="relative">
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Treatment
                                            </label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowDropdown(
                                                            !showDropdown
                                                        )
                                                    }
                                                    className="w-full px-4 py-3 rounded-lg border-0 bg-white text-left text-gray-900 focus:ring-2 focus:ring-white/50 focus:outline-none flex items-center justify-between"
                                                >
                                                    <span
                                                        className={
                                                            selectedTreatment
                                                                ? "text-gray-900"
                                                                : "text-gray-500"
                                                        }
                                                    >
                                                        {selectedTreatment ||
                                                            "Pilih treatment/perawatan"}
                                                    </span>
                                                    <svg
                                                        className={`w-5 h-5 text-gray-400 transition-transform ${
                                                            showDropdown
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </button>

                                                {showDropdown && (
                                                    <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                                                        {treatments.map(
                                                            (treatment) => (
                                                                <button
                                                                    key={
                                                                        treatment.id
                                                                    }
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleTreatmentSelect(
                                                                            treatment
                                                                        )
                                                                    }
                                                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                                                                >
                                                                    <div className="text-gray-900 font-medium">
                                                                        {
                                                                            treatment.name
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm text-gray-500">
                                                                        Rp{" "}
                                                                        {
                                                                            treatment.price
                                                                        }
                                                                    </div>
                                                                </button>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            {errors.treatment && (
                                                <p className="mt-1 text-sm text-red-200">
                                                    {errors.treatment}
                                                </p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={
                                                isSubmitting ||
                                                processing ||
                                                hasExistingAppointment
                                            }
                                            className="w-full bg-secondary hover:bg-primary text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {hasExistingAppointment
                                                ? "Reservasi Sedang Diproses"
                                                : isSubmitting
                                                ? "Mengirim..."
                                                : "Submit"}
                                        </Button>

                                        {message.text && (
                                            <div
                                                className={`p-3 rounded-lg text-sm ${
                                                    message.type === "success"
                                                        ? "bg-green-100 text-green-800 border border-green-200"
                                                        : "bg-red-100 text-red-800 border border-red-200"
                                                }`}
                                            >
                                                {message.text}
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PasienLayout>
        </div>
    );
}
