import { Head, Link, useForm } from "@inertiajs/react";
import imgLogin from "../../../../assets/imgLogin.png";
import logo from "../../../../../public/LogoPDC.svg";
import bgLogin from "../../../../assets/bg-kain.jpg";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("pasien.login.post"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-lexend">
            <Head title="Login - Pasien" />

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

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="flex justify-center">
                        <div className="flex items-center space-x-2">
                            <img
                                src={logo}
                                alt="Logo PDC"
                                className="w-32 h-32"
                            />
                        </div>
                    </div>

                    <div className="text-left mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Login
                        </h2>
                        <p className="text-gray-600">
                            Jika kamu belum memiliki akun{" "}
                            <Link
                                href={route("pasien.register")}
                                className="text-secondary hover:text-amber-700 font-medium"
                            >
                                daftar disini!
                            </Link>
                        </p>
                    </div>

                    {status && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
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
                                placeholder="Masukkan email anda"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                placeholder="••••••••••••"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                required
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                    Ingat saya
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    href={route("pasien.password.request")}
                                    className="font-medium text-amber-600 hover:text-amber-500"
                                >
                                    Lupa password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-tertiary text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {processing ? "Memproses..." : "Masuk"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}


