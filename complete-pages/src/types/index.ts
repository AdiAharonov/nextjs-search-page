import { FormEvent } from "react";

export interface SearchResult {
    id: number;
    title: string;
    description: string;
  }

  export interface SearchContainerProps {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
  }