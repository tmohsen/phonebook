
import React from 'react'

const Filter = ({ newFilter, handleFilterChange }) => (
  <>
    <h2>Filter</h2>
    <div>
      filter shown with:
      {' '}
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  </>
)

export default Filter
