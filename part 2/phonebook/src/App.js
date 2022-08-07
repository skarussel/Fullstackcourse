import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const addName = (event) => {
    event.preventDefault()
    if (persons.some(el => el.name === newName)){
      alert(newName + ' is already a member of the Phonebook')
      return 
    } 
    const nameObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  
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
      <Filter filter={newFilter} filterFunc={handleFilterChange}/>
      <h2>Add new Entry</h2>
      <PersonForm addFunc={addName} newName={newName} newNumber={newNumber} 
        nameHandler={handleNameChange} numberHandler={handleNumberChange}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={newFilter}/>
    </div>
  )
}

const Filter = ({filter, filterFunc}) => {
  return (
    <div>
      filter shown with a <input value ={filter}
      onChange={filterFunc}
      />
      </div>

  )
}

const PersonForm = ({addFunc, newName, newNumber, nameHandler, numberHandler}) => {

  return (
    <form onSubmit={addFunc}>
        <div>
          name: <input value={newName}
          onChange={nameHandler}/>
        </div>
        <div>number: <input value={newNumber}
          onChange={numberHandler} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )

}

const PersonList = ({persons, filter}) => {
  return persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => <p key={person.id}> {person.name} {person.number} </p>)

}
 





export default App