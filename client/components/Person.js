import React from 'react'

const Person = ({ person, onDelete }) => {
  const delPerson = () => {
    /* eslint-disable */
    if (window.confirm(`Delete ${person.name}?`)) {
      onDelete(person.id)
    }
    /* eslint-enable */
  }

  return (
    <>
      <p key={person.id}>
        {person.name}
        {' '}
        {person.number}
        {' '}
        <button type="submit" onClick={delPerson}>delete</button>
      </p>
    </>
  )
}

export default Person
