import React, { useEffect, useState } from 'react'

function TableDisplay(props) {
  const [selectedAttribute, setSelectedAttribute] = useState('Select Attribute: ');
  const [searchValue, setSearchValue] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(props.data);
    console.log(filtered)
  }, []);

  const handleDropdownChange = (e) => {
    setSelectedAttribute(e.target.value)
    sortByAttribute(e.target.value)
  }

  const sortByAttribute = (columnName) => {
    props.data.sort((a, b) => {
      var val_a = a[columnName];
      var val_b = b[columnName];

      return ((val_a < val_b) ? -1 : ((val_a > val_b) ? 1 : 0));
    })
  }

  const searchOperation = () => {
    console.log('Inside search- ')
    if (searchValue === '') {
      setFiltered(props.data);
    }
    else {
      const filteredData = props.data.filter((row) =>
        props.columns.some((column) => row[column].toLowerCase().includes(searchValue.toLowerCase()))
      );
      setFiltered(filteredData);
    }

  }

  return (
    <>
      {props.sorting && <label>
        Sort by:
        <select value={selectedAttribute} onChange={handleDropdownChange}>
          {props.columns.map((column) => (
            <>
              <option key={column.id} value={column} >{column}</option>
            </>
          ))}
        </select>
      </label>}

      {props.searching &&
        (<>
          <label>
            Search:
            <input type='text' value={searchValue} onChange={(e) => {
              setSearchValue(e.target.value);
            }} />
          </label>
          <button onClick={searchOperation}>Search</button>
        </>)
      }
      <br />

      <h2>Table</h2>
      <br />
      <br />

      <table border={'1px'}>
        <thead>
          <tr>
            {props.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((row) => (
            <tr key={row.id}>
              {props.columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>



    </>
  )
}

export default TableDisplay