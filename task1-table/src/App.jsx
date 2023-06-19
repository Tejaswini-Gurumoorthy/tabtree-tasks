import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [attributes, setAttributes] = useState([]);
  const [url, setUrl] = useState('');
  const [selectedAttributes, setSelectedAttributes] = useState([]);


  const fetchData = async () => {
    const data = await (await fetch(url)).json();
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

  const showTable=()=>{
    console.log(selectedAttributes);
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
              <input value={attribute} type='checkbox' onChange={handleAttributeChange} />
              <span>{attribute}</span>
            </div>
          ))
        }
        <button onClick={showTable}>Show table</button>
      </>}
      <br />


    </>
  )
}

export default App
