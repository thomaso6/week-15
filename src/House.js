import {useState} from "react";

function House({id, name, occupents, updateHouse, updateOccupents, deleteHouse}){
    const[editing, setEditing] = useState(false);
    const [inputNameValue, setInputNameValue] = useState(name);
    const [inputOccupentsValue, setInputOccupentsValue] = useState(occupents);
    function handleInputNameChange(event){
        setInputNameValue(event.target.value);
      }
    function handleInputOccupentsChange(event){
        setInputOccupentsValue(event.target.value);
    }
    return(
        <div id="house"key={id}>
            {!editing && (<h3>{name}</h3>)}
            {editing && (<input value={inputNameValue} onChange={handleInputNameChange}></input>)}
            {!editing && <div>By: {occupents}</div>}
            {editing && (<input value={inputOccupentsValue} onChange={handleInputOccupentsChange}></input>)}
            <button id="btn" onClick={()=>{
                setEditing(!editing);
            }}>{editing ? "Done" : "Edit"}
        
            </button>
            {editing && <button id="btn"onClick={()=>{updateHouse(id, inputNameValue)}}>Update Name</button>}
            {editing && <button id="btn"onClick={()=>{updateOccupents(id, inputOccupentsValue)}}>Update Occupents</button>}
            <button id="btn"onClick={()=>{deleteHouse(id)}}>Delete</button>
        </div>
    )
}
export default House;