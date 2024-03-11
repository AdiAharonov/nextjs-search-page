// src/pages/search.tsx
import { FormEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SearchResult } from '@/types';
import SearchContainer from '@/components/searchContainer/SearchContainer';

const fetchSearchResults = async (query: string): Promise<SearchResult[]> => {
  if (query.trim() === '') return [];
  const { data } = await axios.get<SearchResult[]>(`https://api.api-ninjas.com/v1/recipe?query=${query}`);
  return data;
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data: searchResults, isLoading, isError, error } = useQuery<SearchResult[], Error>({
    queryKey: ['search', searchTerm],
    queryFn: () => fetchSearchResults(searchTerm),
    enabled: searchTerm.length > 2,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // The search is already being performed on searchTerm change.
  };

  return (
    <div className="container mx-auto p-4">
      <SearchContainer handleSubmit={handleSubmit} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      {searchResults && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id} className="mb-2">
              <h3>{result.title}</h3>
              <p>{result.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchPage;
