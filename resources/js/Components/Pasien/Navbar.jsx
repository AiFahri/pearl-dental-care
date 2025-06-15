import { useState } from "react";
import { Link, usePage, router, route } from "@inertiajs/react";
import logo from "../../../../public/LogoPDC.svg";
import Button from "@/Components/UI/Button";

export default function Navbar() {
    const { auth } = usePage().props;
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: "Dashboard", href: "/" },
        { name: "Dokter Gigi", href: "/pasien/dokter" },
        { name: "Treatment", href: "/pasien/treatment" },
        { name: "Reservasi", href: "/pasien/reservasi" },
    ];

    const handleLogout = () => {
        router.post(route("logout"));
    };

    return (
        <nav className="absolute top-0 left-0 w-full z-30 bg-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <Link className="flex items-center gap-2" href={"/"}>
                        <img src={logo} alt="Logo PDC" className="w-24 mt-4" />
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-secondary hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            {auth.user ? (
                                <div className="relative">
                                    <button
                                        onClick={() =>
                                            setProfileDropdownOpen(
                                                !profileDropdownOpen
                                            )
                                        }
                                        className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
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
                                            className="w-4 h-4"
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
                                    {profileDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Edit Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Button
                                    href="/pasien/login"
                                    variant="primary"
                                    size="sm"
                                >
                                    Sign In
                                </Button>
                            )}
                        </div>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200">
                    <div className="px-4 py-2 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}

                        <div className="pt-4 pb-2 border-t border-gray-200">
                            {auth.user ? (
                                <div className="space-y-1">
                                    <div className="flex items-center px-3 py-2">
                                        <img
                                            className="w-8 h-8 rounded-full mr-3"
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                auth.user.name
                                            )}&background=fed7aa&color=ea580c&size=32`}
                                            alt=""
                                        />
                                        <span className="text-base font-medium text-gray-700">
                                            {auth.user.name}
                                        </span>
                                    </div>
                                    <Link
                                        href="/profile"
                                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Edit Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="px-3 py-2">
                                    <Button
                                        href="/pasien/login"
                                        variant="primary"
                                        size="sm"
                                        className="w-full"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
