import { Head, Link, useForm } from "@inertiajs/react";
import imgLogin from "../../../../assets/imgLogin.png";
import logo from "../../../../../public/LogoPDC.svg";
import bgLogin from "../../../../assets/bg-kain.jpg";

export default function ForgotPassword({
    status,
    role = "pasien",
    routePrefix = "pasien",
}) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route(`${routePrefix}.password.email`));
    };

    const getTitle = () => {
        switch (role) {
            case "admin":
                return "Lupa Password - Admin";
            case "dokter":
                return "Lupa Password - Dokter";
            default:
                return "Lupa Password - Pasien";
        }
    };

    const getHeading = () => {
        switch (role) {
            case "admin":
                return "Lupa Password Admin";
            case "dokter":
                return "Lupa Password Dokter";
            default:
                return "Lupa Password";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-lexend">
            <Head title={getTitle()} />

            <div className="hidden lg:flex lg:w-2/5 relative m-6">
                <div
                    className="w-full h-full rounded-3xl overflow-hidden relative"
                    style={{ backgroundImage: `url(${bgLogin})` }}
                >
                    <img
                        src={imgLogin}
                        alt="Login"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
                    />

                    <div className="absolute top-12 left-12 text-white">
                        <h1 className="text-4xl font-bold leading-tight">
                            Layanan terbaik
                            <br />
                            menanti Anda.
                            <br />
                            Masuk sekarang!
                        </h1>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="text-center mb-8">
                        <img
                            src={logo}
                            alt="Pearls Dental Care"
                            className="h-12 mx-auto"
                        />
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            {getHeading()}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Masukkan email Anda dan kami akan mengirimkan link
                            untuk reset password
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                required
                                autoFocus
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                disabled={processing}
                            >
                                {processing
                                    ? "Memproses..."
                                    : "Kirim Link Reset Password"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href={route(`${routePrefix}.login`)}
                            className="text-sm text-amber-600 hover:text-amber-500"
                        >
                            Kembali ke halaman login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
