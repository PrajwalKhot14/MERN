import Axios from 'axios';

import './App.css';
import {useState} from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const [newWage, setNewWage] = useState(0);

  const addEmployee = () =>{
    Axios.post('http://localhost:3001/create', {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,}).then(() => {
        console.log("success");
      });
  }

  const getEmployee = () => {
    Axios.get('http://localhost:3001/employees').then((response) => {
      // console.log(response)
      setEmployeeList(response.data)
    });
  }
  // const displayInfo = () => {
  //   console.log(name + age + position + country + wage);
  // }

  const updateEmployeeWage = (id) => {
    Axios.put('http://localhost:3001/update', {wage:newWage, id: id}).then((response) =>{
      setEmployeeList(employeeList.map((val) =>{
        return val.id == id ? {id : val.id, name : val.name, age : val.age, postion : val.position, country : val.country, wage : newWage} : val
      }))
    });
  }
  return (
    <div className="App information">
      <label>Name:</label>
      <input type = "text" onChange={(event) => {setName(event.target.value);}}/>
      <label>Age:</label>
      <input type = "number" onChange={(event) => {setAge(event.target.value);}}/>
      <label>Position:</label>
      <input type = "text" onChange={(event) => {setPosition(event.target.value);}}/>
      <label>Country:</label>
      <input type = "text" onChange={(event) => {setCountry(event.target.value);}}/>
      <label>Wage:</label>
      <input type = "number" onChange={(event) => {setWage(event.target.value);}}/>
      <button onClick = {addEmployee}>Add</button>

      <div>------------------------------------------------------------------------</div>
      <br></br>
      <div>------------------------------------------------------------------------</div>
      <br></br>

      <div className="employees">
        <button onClick = {getEmployee}>Show Employees</button>
        {employeeList.map((val, key) =>{
          return( <div className="employeeDisplay">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>
                <input
                  type = "text"
                  placeholder = "40"
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}/>
                <button
                  onClick = {() =>{
                    updateEmployeeWage(val.id)
                  }}>
                  {" "}UPDATE</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>


  );
}

export default App;
