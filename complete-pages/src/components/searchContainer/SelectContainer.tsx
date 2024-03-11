import React from 'react';

// Define the type for a single option
interface Option {
  displayName: string;
  // Include other properties of an option here if necessary, for example:
}

// Define the props expected by SelectContainer
interface SelectContainerProps {
  options: Option[];
}

const SelectContainer: React.FC<SelectContainerProps> = ({ options = [] }) => {
  return (
    <div className='w-full h-[320px] px-2 flex flex-col items-start border-2 border-gray-300/80 rounded overflow-scroll'
    style={options.length > 0 ? {} : {display: 'none'}}>
      {options.map((option, index) => (
        <button key={index} className='text-left w-full hover:bg-gray-100 rounded-md w-full'>
          {option.displayName}
        </button>
      ))}
    </div>
  );
};

export default SelectContainer;
