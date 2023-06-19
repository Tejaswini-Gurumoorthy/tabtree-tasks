import { useEffect, useState } from 'react'
import './App.css'
import TableDisplay from './components/TableDisplay';

function App() {
  const [attributes, setAttributes] = useState([]);
  const [url, setUrl] = useState('');
  const [tableData, setTableData]= useState([]);
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

  const handleNoOfRows=(e)=>{
    setNoOfRows(e.target.value);
  }


  return (
    <>
      <h1>Table Operations</h1>
      <label>
        Data source:
        <input onChange={(event) => {
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
        <p>Select the attributes to be displayed-</p>
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
          <input value={searching} type='checkbox' onChange={handleSearchConfig}/>
          <span>Enable Search</span>
          <br/>
          <input value={sorting} type='checkbox' onChange={handleSortConfig}/>
          <span>Enable Sort</span>
        </label>
        <br/>
        <label>
          Number of rows: 
          <input type='number' onChange={handleNoOfRows}/>
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
      {showTable && <TableDisplay columns={selectedAttributes} data={tableData} seraching={searching} sorting={sorting} rows={noOfRows}/>}


    </>
  )
}

export default App
