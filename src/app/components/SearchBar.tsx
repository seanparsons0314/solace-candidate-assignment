import React from "react";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange, onClick }) => {
  return (
    <div>
      <p>Search</p>
      <p>
        Searching for: <span id="search-term"></span>
      </p>
      <input style={{ border: "1px solid black" }} onChange={onChange} />
      <button onClick={onClick}>Reset Search</button>
    </div>
  );
};

export default SearchBar;
