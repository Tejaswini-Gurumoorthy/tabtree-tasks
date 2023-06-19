import React, { useState } from 'react';

function TableDisplay(props) {
  const [selectedAttribute, setSelectedAttribute] = useState('Select Attribute: ');

  const handleAttributeChange = (event) => {
    setSelectedAttribute(event.target.value);
  };

  return (
    <>
      <label>
        Search:
        <select value={selectedAttribute} onChange={handleAttributeChange}>
          {props.columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
      </label>
      <br />
      <br />
    </>
  );
}

export default TableDisplay;
