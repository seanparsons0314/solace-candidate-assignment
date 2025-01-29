import React from "react";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, onReset }) => {
  return (
    <div className="flex flex-col sm:flex-row mb-6">
      <input
        className="flex-grow border border-gray-400 p-2 rounded-l sm:mr-2 mb-2 sm:mb-0"
        onChange={onChange}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-r"
        onClick={onReset}
      >
        Reset Search
      </button>
    </div>
  );
};

export default SearchBar;
