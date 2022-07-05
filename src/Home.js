import MyCard from "./Components/MyCard";
import {StoreData} from "./Data/GetData"
import "./Components/CardContainer.css"
import {useState, useEffect, useMemo} from "react"
import SearchAppBar from "./Components/Navigation"

function Home() {
  const [show,setShow] = useState(0);
  const [data, setData]=useState();
  function setDatas(arr){
    setData(arr)
  }
  useMemo(()=>{
  if(data){ 
    console.log("data Data in useMemo", data)
    setShow(1);
    console.log("show is now 0")
  }
 
    },[data])


  console.log("data Data in App", data)
  return (
    <>
    <SearchAppBar data={data} />
    <div className="App Cards">
     { !show && (
      
      <StoreData set = {setDatas} />
     )}
     {
      data?.map(url => (
      <MyCard url={url}/>
          ))
      }
  
      
      </div> 
    </>
    ) }

export default Home;