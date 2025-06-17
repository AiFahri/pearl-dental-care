import { Head, useForm } from "@inertiajs/react";
import logo from "../../../../../public/LogoPDC.svg";

export default function ResetPassword({ token, email, role = 'pasien', routePrefix = 'pasien' }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route(`${routePrefix}.password.update`));
    };

    const getTitle = () => {
        switch(role) {
            case 'admin':
                return 'Reset Password - Admin';
            case 'dokter':
                return 'Reset Password - Dokter';
            default:
                return 'Reset Password - Pasien';
        }
    };

    const getHeading = () => {
        switch(role) {
            case 'admin':
                return 'Reset Password Admin';
            case 'dokter':
                return 'Reset Password Dokter';
            default:
                return 'Reset Password';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-lexend">
            <Head title={getTitle()} />

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
                            Buat password baru untuk akun Anda
                        </p>
                    </div>

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
                                readOnly
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password Baru
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                required
                                autoComplete="new-password"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Konfirmasi Password Baru
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData("password_confirmation", e.target.value)
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                                disabled={processing}
                            >
                                {processing ? "Memproses..." : "Reset Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


