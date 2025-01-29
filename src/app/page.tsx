"use client";

import { useState } from "react";
import { SearchBar, AdvocateTable } from "./components";
import useAdvocates from "./hooks/useAdvocates";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { advocates, totalItems, loading } = useAdvocates({ keyword, page, itemsPerPage });

  const onSearch = (keyword: string) => {
    setKeyword(keyword);
    setPage(1);
  };

  const onResetSearch = () => {
    setKeyword("");
    setPage(1);
  };

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Solace Advocates</h1>
      <SearchBar onSearch={onSearch} onReset={onResetSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <AdvocateTable
          advocates={advocates}
          totalItems={totalItems}
          currentPage={page}
          itemsPerPage={itemsPerPage}
          onPageChange={setPage}
          onPageSizeChange={setItemsPerPage}
        />
      )}
    </main>
  );
}
