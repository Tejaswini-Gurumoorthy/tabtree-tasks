import React, { useEffect, useState } from 'react';

function TableDisplay(props) {
  const [dataLength,setDataLength]= useState(props.data.length);
  const [filtered, setFiltered] = useState([]);
  const [currentData, setCurrentData]= useState([]);
  const [paginationNumber, setpaginationNumber]=useState(5);
  const [totalPages, setTotalPages]= useState(dataLength/paginationNumber);
  const [pageNumber, setPageNumber]= useState(1);


  useEffect(() => {
    setFiltered(props.data);
    setCurrentData(filtered.slice(0,paginationNumber));
  }, []);

  const handleDropdownChange = async(e) => {

    if(e.target.value==='none')
    {
      setFiltered(props.data);
    }
    
    else{
      await sortByAttribute(e.target.value).then((sorted)=>{
        setFiltered(sorted);
      }).catch((err)=>{
        console.log('error while sorting: ',err)
      });
    }
    console.log('filtered: ', filtered);
    
  }

  const sortByAttribute = async(columnName) => {
    try{
      const sorted= [...filtered].sort((a, b) => {
        var val_a = a[columnName];
        var val_b = b[columnName];
  
        return ((val_a < val_b) ? -1 : ((val_a > val_b) ? 1 : 0));
      })
      return sorted;
    }

    catch(err){
      return err;
    }
    
  }

  const searchOperation = (e) => {
    if (e.target.value === '') {
      setFiltered(props.data);
    }
    else {
      const filteredData = props.data.filter((row) =>
        props.columns.some((column) => row[column].toLowerCase().includes(e.target.value.toLowerCase()))
      );
      setFiltered(filteredData);
    }

  }

  useEffect(()=>{
    setDataLength(filtered.length);
    setTotalPages(dataLength/paginationNumber>=1 ? Math.ceil(dataLength/paginationNumber) : 1);
    const startValue= (pageNumber-1)*paginationNumber;
    const endValue= (pageNumber)* paginationNumber;
    setCurrentData(filtered.slice(startValue, endValue));
    },[paginationNumber, filtered, pageNumber])

useEffect(()=>{
  setPageNumber(1);
  setTotalPages(dataLength/paginationNumber>=1 ? Math.ceil(dataLength/paginationNumber) : 1);

},[dataLength])

  return (
    <>
      <div className='sort-and-search'>
      {props.searching &&
        (<>
          <label className='search-box'>
            Search:
            <input className='search-input' type='text' onChange={searchOperation}  />
          </label>
        </>)
      }
      {props.sorting && <label className='sort-box'>
        Sort by:
        <select className='pagination-select' onChange={handleDropdownChange}>
          <option value={`none`}>none</option>
          {props.columns.map((column) => (
            <>
              <option key={column.id} value={column} >{column}</option>
            </>
          ))}
        </select>
      </label>}
      </div>

      <table  border={'1px'}>
        <thead>
          <tr>
            {props.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.id}>
              {props.columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <span>Number of rows: </span>
        <select className='pagination-select' value={paginationNumber} onChange={(e)=>{setpaginationNumber(e.target.value)}}>
          {
            props.pagination.map((element)=>(
              <option id={element.id} value={element}>{element}</option>
            ))
          }
        </select>
        <button className='arrow-button' onClick={()=>{setPageNumber(pageNumber-1)}} disabled={pageNumber<=1}>{`<`}</button>
        {pageNumber<=totalPages ? (<span>{` ${pageNumber} / ${totalPages} `}</span>): setPageNumber(1)}
        <button className='arrow-button' onClick={()=>{setPageNumber(pageNumber+1)}} disabled={pageNumber>=totalPages}>{`>`}</button>

      </div>
 </>
  )
}

export default TableDisplay