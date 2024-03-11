import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchContainer from '../SearchContainer'; // Adjust the import path as necessary
import { foodItems } from '@/services/searchData'; // Adjust the import path as necessary
import { isTermIncluded } from '@/utils/functions'; // Adjust the import path as necessary

describe('SearchContainer', () => {
  const mockSetSearchTerm = jest.fn();
  const mockHandleSubmit = jest.fn((e) => e.preventDefault()); // Prevent form submission during tests

  beforeEach(() => {
    render(<SearchContainer searchTerm="" setSearchTerm={mockSetSearchTerm} handleSubmit={mockHandleSubmit} />);
  });

  it('renders the search input and button', () => {
    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates searchTerm on input change', async () => {
    const input = screen.getByPlaceholderText(/search.../i);
    await userEvent.type(input, 'pizza');
    expect(mockSetSearchTerm).toHaveBeenCalledWith('pizza');
  });

  it('calls handleSubmit on form submission', async () => {
    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('filters options based on searchTerm and displays them in SelectContainer', async () => {
    // Assuming searchTerm is set to "pizza" and only one item matches
    // Re-render with searchTerm = "pizza"
    render(<SearchContainer searchTerm="pizza" setSearchTerm={mockSetSearchTerm} handleSubmit={mockHandleSubmit} />);
    const options = foodItems.filter(item => isTermIncluded("pizza", item.displayName));
    const displayedOptions = screen.getAllByRole('button').filter(button => options.some(option => option.displayName === button.textContent));
    
    expect(displayedOptions.length).toBeGreaterThan(0); // or use a specific number for precise matching
  });
});

