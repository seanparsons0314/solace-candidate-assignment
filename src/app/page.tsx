"use client";

import { useEffect, useState } from "react";
import { SearchBar, AdvocateTable } from "./components";
import { Advocate } from "./types";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    document.getElementById("search-term")!.innerHTML = searchTerm;
    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => (
      advocate.firstName.includes(searchTerm) ||
      advocate.lastName.includes(searchTerm) ||
      advocate.city.includes(searchTerm) ||
      advocate.degree.includes(searchTerm) ||
      advocate.specialties.includes(searchTerm) ||
      advocate.phoneNumber.toString().includes(searchTerm)
    ));
    setFilteredAdvocates(filteredAdvocates);
  };

  const onResetSearch = () => {
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Solace Advocates</h1>
      <SearchBar onChange={onChange} onReset={onResetSearch} />
      <AdvocateTable advocates={filteredAdvocates} />
    </main>
  );
}
