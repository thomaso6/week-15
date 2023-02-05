import {useState, useEffect} from "react";
import House from "./House";
import logo from "./logo.svg";

function App() {

  const [houses, setHouses] = useState([]);
  const [houseContent, setHouseContent] = useState("");
  const [occupents, setOccupents] = useState("");

  useEffect(() =>{
    getHouses();
  }, [])

  async function getHouses(){
    const response = await fetch("http://localhost:8000/houses");
    const houses = await response.json();
    setHouses(houses);
  }
  async function submitHouse(){
    if(houseContent.length === 0 || occupents.length === 0){
      return;
    }
    await fetch("http://localhost:8000/houses", {
      method: "POST",
      body: JSON.stringify({name: houseContent, occupents: occupents}),
      headers:{
          "Content-Type": "application/json",
      }
    });
    setOccupents("");
    setHouseContent("");
    getHouses();
  }
  async function updateHouse(id, newContent){
    await fetch(`http://localhost:8000/houses/${id}`, {
      method: "PATCH",
      body: JSON.stringify({name: newContent, }),
      headers:{
          "Content-Type": "application/json",
      }
    });
    getHouses();
  }
  async function updateOccupents(id, newOccupents){
    await fetch(`http://localhost:8000/houses/${id}`, {
      method: "PATCH",
      body: JSON.stringify({occupents: newOccupents, }),
      headers:{
          "Content-Type": "application/json",
      }
    });
    getHouses();
  }
  async function deleteHouse(id){
    await fetch(`http://localhost:8000/houses/${id}`, {
      method: "DELETE",
    });
    getHouses();
  }
  function handleHouseContentChange(event){
    setHouseContent(event.target.value);
  }
  function handleOccupentsChange(event){
    setOccupents(event.target.value);
  }

  return( <div>
    <h1 id="head">House Descriptions:</h1>
    <div id="box">
      <div id="name-box"><input value={houseContent} placeholder="House Name" onChange={handleHouseContentChange}></input></div>
      <div id="occupent-box"><input value={occupents} placeholder="Number of occupents" onChange={handleOccupentsChange}></input></div>
    <button className="submit"id="btn"onClick={submitHouse}>Submit</button></div>
  
    {houses.map(house =>{
      return(
        <House name={house.name} occupents={house.occupents} id={house.id} updateHouse={updateHouse} updateOccupents={updateOccupents} deleteHouse={deleteHouse}></House>
      )
      
    })}
  </div>
  );
}

export default App;
