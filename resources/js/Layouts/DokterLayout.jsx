import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import logo from "../../../public/LogoPDC.svg";

export default function DokterLayout({ children }) {
    const { auth } = usePage().props;
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const navigation = [
        {
            name: "Dashboard",
            href: "/dokter/dashboard",
            icon: "🏠",
            current: true,
        },
        {
            name: "Appointment",
            href: "/dokter/appointment",
            icon: "📅",
            current: false,
        },
    ];

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <div className="min-h-screen bg-gray-50 font-lexend">
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
                <div className="flex h-16 items-center px-6">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Logo PDC" className="w-24" />
                    </div>
                </div>

                <nav className="mt-8 px-4">
                    <ul className="space-y-2">
                        {navigation.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                        item.current
                                            ? "bg-orange-50 text-orange-700 border-r-2 border-orange-500"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="absolute bottom-6 left-4 right-4">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-orange-100 text-orange-700 px-4 py-3 rounded-lg font-medium text-sm hover:bg-orange-200 transition-colors"
                    >
                        Log out
                    </button>
                </div>
            </div>

            <div className="pl-64">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex h-16 items-center justify-between px-8">
                        <h1 className="text-xl font-semibold text-gray-900">
                            Dashboard
                        </h1>

                        <div className="flex items-center gap-4">
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 17h5l-5 5v-5z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19c-5 0-8-3-8-6s4-6 9-6 9 3 9 6c0 1-1 3-2 3h-1l-1 1z"
                                    />
                                </svg>
                            </button>

                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setUserDropdownOpen(!userDropdownOpen)
                                    }
                                    className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50"
                                >
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            auth.user.name
                                        )}&background=fed7aa&color=ea580c&size=32`}
                                        alt=""
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        {auth.user.name}
                                    </span>
                                    <svg
                                        className="w-4 h-4 text-gray-400"
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
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}
