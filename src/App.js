
import './App.css';
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {

  const API_URL = 'https://650dd9a3a8b42265ec2cc192.mockapi.io/animalData';

  const [animals, setAnimals] = useState([{
    name: "Brown Bear",
    dietaryPattern: "Omnivores",
    endangered: false,
    habitat: "Forests, Mountains, Tundra, Semi-Deserts",
    id: "0",
  },
]);



const [newName, setNewName] = useState(' ')
const [newHabitat, setNewHabitat] = useState(' ')
const [newDietaryPattern, setNewDietaryPattern] = useState(' ')
const [newEndangered, setNewEndangered] = useState(' ')


const [updateName, setUpdateName] = useState(' ')
const [updateHabitat, setUpdateHabitat] = useState(' ')
const [updateDietaryPattern, setUpdateDietaryPattern] = useState(' ')
const [updateEndangered, setUpdateEndangered] = useState(' ')


/* Read */

  const getAnimals = async () => {
    const response = await fetch(API_URL);
    const data = await response.json()
    setAnimals(data)
  }

  useEffect(() => {
    getAnimals()
}, [])




/* Delete */

function deleteAnimal(id) {
  fetch(`${API_URL}/${id}` , {
    method: 'Delete'
  }).then(() => getAnimals())
}   


/* Create */

function createNewAnimal(e) {

  e.preventDefault();

  fetch(API_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: newName,
      habitat: newHabitat,
      dietaryPattern: newDietaryPattern,
      endangered: newEndangered,
    })
}).then(() => getAnimals())

}

/* Update */

function animalUpdate(e, animalObject) {

  e.preventDefault()

  const updatedAnimalObject = {
    ...animalObject,  //spreads out key value pairs from an existing obj thats passed in
    name: updateName, //updates name with the value of this variable
    habitat: updateHabitat,
    dietaryPattern: updateDietaryPattern,
    endangered: updateEndangered
  }

  fetch(`${API_URL}/${animalObject.id}`, {
    method: 'PUT',
    body: JSON.stringify({updatedAnimalObject}),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => getAnimals())
}




  return (
    <div className="App">

    <h1>Animal Information Database</h1>

<div id="addForm" className="container">
  <div className="row justify-content-center my-5">
    <div className="col-sm-12 col-lg-8">
    <form>
        <h3>Add a New Animal</h3>

      <div className="form-group">
        <label className="form-label d-flex justify-content-between">Animal Name</label>
        <input className="form-control" onChange={(e) => setNewName(e.target.value)}></input> <br></br>
      </div>

      <div className="form-group">
        <label className="form-label d-flex justify-content-between">Habitat</label>
        <input className="form-control" onChange={(e) => setNewHabitat(e.target.value)}></input> <br></br>
      </div>

      <div className="form-group">
        <label className="form-label d-flex justify-content-between">Dietary Pattern</label>
        <input className="form-control" onChange={(e) => setNewDietaryPattern(e.target.value)}></input> <br></br>
      </div>

      <div className="form-group">
        <label className="form-label d-flex justify-content-between">Are they Endangered?</label>
        <input className="form-control" onChange={(e) => setNewEndangered(e.target.value)}></input> <br></br>
      </div>
        <button className="btn btn-primary" onClick={(e) => createNewAnimal(e)}>Submit</button> 
      </form>
    </div>
  </div>
</div>
      
      

    {animals.map((animal) => (
      <div className="container" key={animal.id}>
        <div className="row">
          <div className="col">
          <h2>Animal Information</h2>
            <div id="animalInfo">
              Name: {animal.name} <br></br>
              Habitat: {animal.habitat} <br></br>
              Dietary Patterns: {animal.dietaryPattern} <br></br>
              Endangered: {animal.endangered}
              <button className="btn btn-danger" onClick={() => deleteAnimal(animal.id)}>Delete Animal</button>
            </div>
          </div>
          <div className="col">
            <div>
            <form id="updateForm">
              <h4>Update Animal Information</h4>
              <div className="form-group">
                <label className="form-label d-flex justify-content-between">Update Name</label>
                <input className="form-control" onChange={(e) => setUpdateName(e.target.value)}></input><br></br>
              </div>

              <div className="form-group">
                <label className="form-label d-flex justify-content-between">Update Habitat</label>
                <input id="habitat" className="form-control" onChange={(e) => setUpdateHabitat(e.target.value)}></input><br></br>
              </div>

              <div className="form-group">
                <label className="form-label d-flex justify-content-between">Update Dietary Pattern</label>
                <input className="form-control" onChange={(e) => setUpdateDietaryPattern(e.target.value)}></input><br></br>
              </div>

              <div className="form-group">
                <label className="form-label d-flex justify-content-between">Update Endangered Status</label>
                <input className="form-control" onChange={(e) => setUpdateEndangered(e.target.value)}></input><br></br>
              </div>
        
              <button type="button" className="btn btn-info" id="updateBtn" onClick={(e) => animalUpdate(e, animal)}>Update</button>
            </form>
            </div>
          </div>
        </div>
      </div>
      
      ))}
    </div>
    )
  }

