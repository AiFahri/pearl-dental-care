import React from 'react';

/**
 * SearchResults component to display search result information
 * @param {string} searchTerm - Current search term
 * @param {number} resultCount - Number of results
 * @param {string} className - Additional CSS classes
 */
export default function SearchResults({ 
    searchTerm, 
    resultCount, 
    className = "" 
}) {
    if (!searchTerm) return null;

    return (
        <p className={`mt-2 text-sm text-gray-600 ${className}`}>
            {resultCount > 0
                ? `Menampilkan ${resultCount} hasil untuk "${searchTerm}"`
                : `Tidak ada hasil untuk "${searchTerm}"`}
        </p>
    );
}
