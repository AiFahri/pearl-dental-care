import React from 'react';
import { SearchBox, SearchResults } from '@/Components/Common';
import { useSearch } from '@/Hooks';

/**
 * SearchForm component that combines SearchBox and SearchResults
 * @param {string} routeName - Route name for search
 * @param {string} placeholder - Search placeholder
 * @param {string} initialSearch - Initial search value
 * @param {number} resultCount - Number of results
 * @param {string} className - Additional CSS classes
 */
export default function SearchForm({
    routeName,
    placeholder = "Cari...",
    initialSearch = '',
    resultCount = 0,
    className = "",
}) {
    const { searchTerm, setSearchTerm, clearSearch } = useSearch(routeName, initialSearch);

    return (
        <div className={className}>
            <SearchBox
                value={searchTerm}
                onChange={setSearchTerm}
                onClear={clearSearch}
                placeholder={placeholder}
            />
            <SearchResults
                searchTerm={searchTerm}
                resultCount={resultCount}
            />
        </div>
    );
}
