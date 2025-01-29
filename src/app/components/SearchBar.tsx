import React from "react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  onReset: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onReset }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value)
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch((e as unknown as React.ChangeEvent<HTMLInputElement>).target.value);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row mb-6">
      <input
        className="flex-grow border border-gray-400 p-2 rounded-l sm:mr-2 mb-2 sm:mb-0"
        onChange={onChange}
        onKeyPress={onKeyPress}
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
