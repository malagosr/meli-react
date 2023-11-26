import { createContext, useContext, useState } from 'react';

const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([])

  const setSearchResultsGlobal = (results) => {
    setSearchResults(results);
  };

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResultsGlobal }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};