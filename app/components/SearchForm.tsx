import React from "react";

interface SearchFormProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleSelect: (name: string) => void;
  suggestions: string[];
  selectedIndex: number;
}

export function SearchForm({
  searchValue,
  setSearchValue,
  handleKeyDown,
  handleSelect,
  suggestions,
  selectedIndex,
}: SearchFormProps) {
  return (
    <div className="w-full max-w-md mb-8 relative">
      <input
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="text"
        name="pokemon"
        id="searchField"
        placeholder="Enter Pokémon name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((name, index) => (
            <li key={name}>
              <button
                type="button"
                className={`w-full text-left px-4 py-2 hover:bg-blue-100 ${
                  index === selectedIndex ? "bg-blue-100 font-semibold" : ""
                }`}
                onClick={() => handleSelect(name)}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
