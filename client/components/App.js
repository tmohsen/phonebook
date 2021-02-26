import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import NewPerson from './NewPerson'
import Person from './Person'
import Notification from './Notification'
import numberService from '../util/services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    numberService.getAll().then((persons) => {
      setPersons(persons)
    })
  }, [])

  const setupNotification = (message, isError) => {
    setNotification(message)
    setIsError(isError)
    setShowNotification(true)

    setTimeout(() => {
      setShowNotification()
    }, 3000)
  }

  const updatePerson = (id, changedPerson) => {
    numberService
      .update(id, changedPerson)
      .then((person) => {
        console.log(changedPerson.number)
        const updatedPersons = persons.map((p) => (p.id !== id ? p : person))
        setPersons(updatedPersons)
        setupNotification('Person succesfully updated', false)
      })
      .catch((err) => {
        console.log(err)
        setupNotification(
          `Failed to update person: ${changedPerson.name}`,
          true,
        )
        setPersons(persons.filter((p) => p.id !== id))
      })
  }

  const createPerson = (newPerson) => {
    numberService
      .create(newPerson)
      .then((person) => {
        setPersons(persons.concat(person))
        setupNotification(`Added ${person.name}`, false)
      })
      .catch((err) => {
        console.log(err)
        setupNotification(`Failed to create person: ${newPerson.name}`, true)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const person = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase(),
    )
    if (person) {
      if (
        /* eslint-disable */
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`,
          )
        /* eslint-enable */
      ) {
        const changedPerson = { ...person, number: newNumber }
        updatePerson(changedPerson.id, changedPerson)
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      createPerson(newPerson)
    }
  }

  const deletePerson = (id) => {
    numberService
      .remove(id)
      .then(() => {
        const newPersons = persons.filter((p) => p.id !== id)
        newPersons.map((p) => console.log(p.name))
        setPersons(newPersons)
        setupNotification('Person succesfully deleted', false)
      })
      .catch((err) => {
        console.log(err)
        setupNotification(`Failed to delete person with id: ${id}`, true)
        setPersons(persons.filter((p) => p.id !== id))
      })
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const personsToShow = persons.filter((p) => p.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      {showNotification && (
        <Notification message={notification} isError={isError} />
      )}
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <NewPerson
        newName={newName}
        newNumber={newNumber}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      {personsToShow.map((p) => (
        <Person key={p.id} person={p} onDelete={deletePerson} />
      ))}
    </div>
  )
}

export default App
