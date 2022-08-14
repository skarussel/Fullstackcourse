import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [updateMessage, setUpdateMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(person => setPersons(person))
  }, [])




  const addName = (event) => {
    event.preventDefault()
    const duplicate = persons.find(el => el.name == newName)

    setNewName('')
    setNewNumber('')
    if (duplicate) {

      if (window.confirm(newName + ' is already a member of the Phonebook. Replace old number with the new one?')) {

        const nameObject = {
          name: newName,
          number: newNumber,
          id: duplicate.id
        }

        personService
          .update(duplicate.id, nameObject)
          .then(setPersons(handlePersonUpdate(duplicate, nameObject)))
          .then(setUpdateMessage(`Changed Number of ${newName}`))
          .then(setTimeout(() => {
            setUpdateMessage(null)
          }, 5000))


      }
      console.log(persons)
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    }



    personService
      .create(nameObject)
      .then(personObject =>
        setPersons(persons.concat(personObject)))
      .then(setUpdateMessage(`Added ${newName}`))
      .then(setTimeout(() => {
        setUpdateMessage(null)
      }, 5000))
      .catch(error => {
        setErrorMessage(
          `Note '${newName}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})


  }

  const handlePersonUpdate = (duplicate, person) => {
    const index = persons.indexOf(duplicate)
    const temp = persons
    temp[index] = person
    return temp

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }



  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)

  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)

  }





  return (
    <div>
      <h2>Phonebook</h2>
      <Notification update_msg={updateMessage} error_msg = {errorMessage}/>
      <Filter filter={newFilter} filterFunc={handleFilterChange} />
      <h2>Add new Entry</h2>
      <PersonForm addFunc={addName} newName={newName} newNumber={newNumber}
        nameHandler={handleNameChange} numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={newFilter} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    </div>
  )
}

const Notification = ({ update_msg, error_msg }) => {
  if (update_msg === null && error_msg=== null) {
    return null
  }
  else if (update_msg){
  return (
    <div className='notification'>
      {update_msg}
    </div>
  )
}
else{
  return(
    <div className='error'>
    {error_msg}
    </div>
  )
}

}

const Filter = ({ filter, filterFunc }) => {
  return (
    <div>
      filter shown with a <input value={filter}
        onChange={filterFunc}
      />
    </div>

  )
}

const PersonForm = ({ addFunc, newName, newNumber, nameHandler, numberHandler }) => {

  return (
    <form onSubmit={addFunc}>
      <div>
        name: <input value={newName}
          onChange={nameHandler} />
      </div>
      <div>number: <input value={newNumber}
        onChange={numberHandler} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}

const PersonList = ({ persons, filter, setPersons,setErrorMessage }) => {
  return persons.filter(person => person.name.toLowerCase().includes(filter))
    .map(person =>
      <p key={person.id}> {person.name} {person.number} <button onClick={() => removePerson(person.name, person.id, persons, setPersons,setErrorMessage)}>Remove</button></p>)

}

const removePerson = (name, id, persons, setPersons,setErrorMessage) => {
  console.log(setErrorMessage)
  console.log(setPersons)
  if (window.confirm("Are u sure, that u want to delete " + name)) {

    personService
      .drop(id)
      .then(setPersons(persons.filter(person => person.id != id)))
      .catch(error => {
        setErrorMessage(
          `Person '${name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)})


  }
}


export default App