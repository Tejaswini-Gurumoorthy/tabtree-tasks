import { useEffect, useState } from 'react'
import './App.css'
import TableDisplay from './components/TableDisplay';

function App() {
  const [tableData, setTableData] = useState([]);
  const columns = ['name', 'age', 'mobile', 'subject1', 'subject2', 'subject3', 'subject4', 'subject5', 'total']
  const pagination= [10,20,30]

  const fetchData = async () => {
    const url= 'https://gogdev2.treeone.one/';
    const data = await (await fetch(url)).json();
    setTableData(data);
  }
  useEffect(() => {
    fetchData();
  }, [])
  return (
    <>
      {tableData.length > 0 &&
        (<TableDisplay
          columns={columns}
          data={tableData}
          searching={true}
          sorting={true} 
          pagination= {pagination}/>)

      }
    </>
  )
}

export default App
