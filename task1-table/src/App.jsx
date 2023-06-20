import { useEffect, useState } from 'react'
import './App.css'
import TableDisplay from './components/TableDisplay';

function App() {
  const [attributes, setAttributes] = useState([]);
  const [url, setUrl] = useState('');
  const [tableData, setTableData]= useState([]);
  const [filteredData, setFilteredData]= useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [searching, setSearching]= useState(false);
  const [sorting, setSorting]=useState(false);
  const [noOfRows, setNoOfRows]=useState(0);
  const [showTable, setShowTable]= useState(false);


  const fetchData = async () => {
    const data = await (await fetch(url)).json();
    setTableData(data);
    const keys = Object.keys(data[0]);
    setAttributes(keys);


  }


  const handleAttributeChange = (e) => {
    if (e.target.checked) {
      setSelectedAttributes([...selectedAttributes, e.target.value]);
    }
    else {
      setSelectedAttributes(selectedAttributes.filter((item) => item !== e.target.value));
    }
    
  }

  const handleSearchConfig=(e)=>{
    if(e.target.checked){
      setSearching(true);
    }
    else{
      setSearching(false);
    }

  }

  const handleSortConfig=(e)=>{
    if(e.target.checked){
      setSorting(true);
    }
    else{
      setSorting(false);
    }

  }

  return (
    <>
      <h1>Table Operations</h1>
      <label>
        Data source:
        <input style={{width: "300px"}} onChange={(event) => {
          setUrl(event.target.value);
        }} type='text' />
      </label>
      <br />
      <br />
      <button onClick={fetchData}>Submit</button>
      <br />
      <br/>
      <br/>

      {attributes.length > 0 && <>
        <b>Select the attributes to be displayed: </b>
        {
          attributes.map((attribute) => (
            <div>
              <input key={attribute.id} value={attribute} type='checkbox' onChange={handleAttributeChange} />
              <span>{attribute}</span>
            </div>
          ))
        }
        <br/>
        <label>
          <input type='checkbox' onChange={handleSearchConfig}/>
          <b> Enable Search</b>
          <br/>
          <input type='checkbox' onChange={handleSortConfig}/>
          <b> Enable Sort</b>
        </label>
        <br/>
        <br/>

        <label>
          <b>Number of rows: </b>
          <input type='number' value={noOfRows} onChange={(e)=>{
            setNoOfRows(e.target.value)
          }}/>
          <br/>
          <p>Leave it blank if you want the whole table.</p>
          
        </label>
        <br/>
        <br/>

        <button onClick={()=>{
          setShowTable(true);
        }}>Show table</button>
      </>}
      <br />
      <br/>
      <br/>
      {showTable && <TableDisplay columns={selectedAttributes} data={noOfRows>0? tableData.slice(0, noOfRows): tableData} searching={searching} sorting={sorting}/>}


    </>
  )
}

export default App
