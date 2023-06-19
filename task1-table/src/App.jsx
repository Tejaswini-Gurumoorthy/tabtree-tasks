import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data,setData]= useState([]);
  useEffect(()=>{

    const fetchData= async()=>{
      const data= await (await fetch('https://gogdev2.treeone.one/')).json();
      return data;
    }

    fetchData().then((data)=>{
      setData(data);
      if(data){
        data.map((row)=>{
          console.log(row.name);
        })
      }
    });
    
  })
  return (
    <>
      <h1>Table Operations</h1>
    </>
  )
}

export default App
