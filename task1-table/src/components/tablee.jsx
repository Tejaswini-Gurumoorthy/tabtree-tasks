import React, { useState } from 'react';

function Table({ columns, data, enableSorting, enableSearch, pageSize }) {
  const [sortColumn, setSortColumn] = useState('');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSortChange = (e) => {
    setSortColumn(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
  };

  const getSortedData = () => {
    if (sortColumn !== '') {
      return [...data].sort((a, b) => a[sortColumn].localeCompare(b[sortColumn]));
    }
    return data;
  };

  const getFilteredData = () => {
    if (searchText !== '') {
      return getSortedData().filter((row) =>
        Object.values(row).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
      );
    }
    return getSortedData();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = getFilteredData().slice(startIndex, endIndex);

  return (
    <div>
      {enableSorting && (
        <label>
          Sort by:
          <select value={sortColumn} onChange={handleSortChange}>
            <option value="">None</option>
            {columns.map((column) => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </label>
      )}
      {enableSearch && (
        <label>
          Search:
          <input type="text" value={searchText} onChange={handleSearchChange} />
        </label>
      )}
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pageSize < getFilteredData().length && (
        <div>
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
          <button disabled={endIndex >= getFilteredData().length} onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
