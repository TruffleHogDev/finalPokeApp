import { Form } from "@remix-run/react";
import React from "react";

interface SearchFormProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SearchForm({
  searchValue,
  setSearchValue,
  handleKeyDown,
}: SearchFormProps) {
  return (
    <Form className="w-full max-w-md mb-8" method="get">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        name="pokemon"
        id="searchField"
        placeholder="Enter Pokémon name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </Form>
  );
}
