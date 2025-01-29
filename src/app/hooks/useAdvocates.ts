import { useState, useEffect } from "react";
import { Advocate } from "../types";

interface UseAdvocatesParams {
  keyword: string;
  page: number;
  itemsPerPage: number;
}

const useAdvocates = ({ keyword, page, itemsPerPage }: UseAdvocatesParams) => {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvocates = async () => {
      setLoading(true);
      const response = await fetch(
        `/api/advocates?search=${keyword}&page=${page}&itemsPerPage=${itemsPerPage}`
      );
      const jsonResponse = await response.json();
      setAdvocates(jsonResponse.data);
      setTotalItems(jsonResponse.totalItems);
      setLoading(false);
    };

    fetchAdvocates();
  }, [keyword, page, itemsPerPage]);

  return { advocates, totalItems, loading };
};

export default useAdvocates;
