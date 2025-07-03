import React from 'react';

/**
 * @param {string} value - Current search value
 * @param {function} onChange - Change handler
 * @param {function} onClear - Clear handler
 * @param {string} placeholder - Placeholder text
 * @param {string} className - Additional CSS classes
 */
export default function SearchBox({
    value,
    onChange,
    onClear,
    placeholder = "Cari...",
    className = "",
}) {
    return (
        <div className={`mb-6 ${className}`}>
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
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
                {value && (
                    <button
                        onClick={onClear}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        type="button"
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
        </div>
    );
}
