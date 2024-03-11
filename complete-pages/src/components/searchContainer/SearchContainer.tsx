import { SearchContainerProps } from '@/types';
import React, { FormEvent, ChangeEvent } from 'react';

// Use the props with their types in your component
const SearchContainer: React.FC<SearchContainerProps> = ({ handleSubmit, searchTerm, setSearchTerm }) => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="input border-2 border-gray-300 p-2 rounded"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-blue-500 text-white p-2 rounded">Search</button>
      </form>
    </div>
  );
};

export default SearchContainer;
