import React, { useState } from "react";
import { Advocate } from "../types";

interface AdvocateTableProps {
  advocates: Advocate[];
}

const AdvocateTable: React.FC<AdvocateTableProps> = ({ advocates }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = advocates.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(advocates.length / itemsPerPage);
  const maxPageButtons = 5;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const toggleRowExpansion = (id: number) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`mx-1 px-3 py-1 border rounded ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-white"
          }`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="pageSize" className="mr-2">Items per page:</label>
          <select
            id="pageSize"
            value={itemsPerPage}
            onChange={handlePageSizeChange}
            className="border border-gray-400 p-1 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        <div className="flex justify-center">
          {renderPageButtons()}
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">Degree</th>
            <th className="py-2 px-4 border-b">Specialties</th>
            <th className="py-2 px-4 border-b">Years of Experience</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((advocate: Advocate) => (
            <tr key={`advocate-${advocate.id}`}>
              <td className="py-2 px-4 border-b">{advocate.firstName}</td>
              <td className="py-2 px-4 border-b">{advocate.lastName}</td>
              <td className="py-2 px-4 border-b">{advocate.city}</td>
              <td className="py-2 px-4 border-b">{advocate.degree}</td>
              <td className="py-2 px-4 border-b">
                {expandedRows.has(advocate.id) ? (
                  <>
                    {advocate.specialties.map((s) => (
                      <div key={s}>{s}</div>
                    ))}
                    <button
                      className="text-blue-500"
                      onClick={() => toggleRowExpansion(advocate.id)}
                    >
                      View Less
                    </button>
                  </>
                ) : (
                  <>
                    {advocate.specialties.slice(0, 2).map((s) => (
                      <div key={s}>{s}</div>
                    ))}
                    {advocate.specialties.length > 2 && (
                      <button
                        className="text-blue-500"
                        onClick={() => toggleRowExpansion(advocate.id)}
                      >
                        View More
                      </button>
                    )}
                  </>
                )}
              </td>
              <td className="py-2 px-4 border-b">{advocate.yearsOfExperience}</td>
              <td className="py-2 px-4 border-b">{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvocateTable;
