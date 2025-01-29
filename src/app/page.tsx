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

  const onSearch = (keyword: string) => {
    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => (
      advocate.firstName.includes(keyword) ||
      advocate.lastName.includes(keyword) ||
      advocate.city.includes(keyword) ||
      advocate.degree.includes(keyword) ||
      advocate.specialties.includes(keyword) ||
      advocate.phoneNumber.toString().includes(keyword)
    ));
    setFilteredAdvocates(filteredAdvocates);
  };

  const onResetSearch = () => {
    setFilteredAdvocates(advocates);
  };


  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Solace Advocates</h1>
      <SearchBar onSearch={onSearch} onReset={onResetSearch} />
      <AdvocateTable advocates={filteredAdvocates} />
    </main>
  );
}
