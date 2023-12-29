import React from 'react';

/**
 * Search bar component.
 * @param {*} param0 
 * @returns a search bar.
 */
const SearchBar = ({ query, setQuery, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
