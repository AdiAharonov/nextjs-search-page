import { SearchContainerProps } from '@/types';
import React, { FormEvent, ChangeEvent } from 'react';
import SelectContainer from './SelectContainer';
import { foodItems } from '@/services/searchData';
import { isTermIncluded } from '@/utils/functions';

// Use the props with their types in your component
const SearchContainer: React.FC<SearchContainerProps> = ({ handleSubmit, searchTerm, setSearchTerm }) => {
  return (
    <div className='max-w-[50%]'>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          className="input border-2 border-gray-300 p-2 rounded flex-1"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-blue-500 text-white p-2 rounded">Search</button>
      </form>

      <SelectContainer options={foodItems.filter((item => searchTerm && isTermIncluded(searchTerm, item.displayName)))} />
    </div>
  );
};

export default SearchContainer;
