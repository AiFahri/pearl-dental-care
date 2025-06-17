import { Head } from "@inertiajs/react";
import StatsCard from "@/Components/UI/StatsCard";
import Button from "@/Components/UI/Button";
import PasienLayout from "@/Layouts/PasienLayout";

export default function Landing({
    isAuthenticated,
    user,
    stats,
    notification,
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 font-lexend overflow-hidden">
            <Head title="Pearls Dental Care" />
            <PasienLayout isLandingPage={true}>
                <div className="relative h-screen flex items-center overflow-hidden">
                    <div className="w-full lg:w-1/2 ml-8 px-12 z-10">
                        <h1 className="text-5xl lg:text-6xl font-bold text-primary leading-tight">
                            Jaga senyummu
                            <br />
                            tetap bersih & sehat!
                        </h1>
                        <p className="mt-6 text-xl text-secondary leading-relaxed">
                            Kami peduli pada kesehatan gigi
                            <br />
                            dan senyum Anda.
                        </p>

                        <div className="mt-12 grid grid-cols-2 gap-6">
                            <StatsCard
                                icon="👨‍⚕️"
                                value={stats?.totalDokters || 0}
                                label="Dokter Gigi"
                                bgColor="bg-tertiary"
                                borderColor="border-orange-200"
                            />
                            <StatsCard
                                icon="👥"
                                value={stats?.totalPasien || 0}
                                label="Pasien"
                                bgColor="bg-tertiary"
                                borderColor="border-blue-200"
                            />
                        </div>

                        {isAuthenticated ? (
                            <div className="mt-8">
                                {notification && (
                                    <div
                                        className={`rounded-2xl p-6 shadow-sm border ${
                                            notification.type === "success"
                                                ? "bg-green-50 border-green-200"
                                                : notification.type ===
                                                  "warning"
                                                ? "bg-yellow-50 border-yellow-200"
                                                : notification.type === "error"
                                                ? "bg-red-50 border-red-200"
                                                : "bg-white border-gray-100"
                                        }`}
                                    >
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            Informasi
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {notification.message}
                                        </p>
                                    </div>
                                )}
                                {!notification && (
                                    <div className="bg-blue-50 rounded-2xl p-6 shadow-sm border border-blue-200">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            Selamat Datang!
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Hai {user.name}, selamat datang di
                                            Pearls Dental Care. Anda dapat
                                            melakukan reservasi pemeriksaan gigi
                                            melalui menu Reservasi.
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="mt-8 flex gap-4">
                                <Button
                                    href="/pasien/register"
                                    variant="primary"
                                    size="lg"
                                >
                                    Daftar Sekarang
                                </Button>
                                <Button
                                    href="/pasien/login"
                                    variant="outline"
                                    size="lg"
                                >
                                    Masuk
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </PasienLayout>
        </div>
    );
}
