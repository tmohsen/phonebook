import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Person from './Person'

test('renders content', () => {
  const person = {
    id: '12',
    name: 'Cameron',
    number: '74573457',
  }

  const mockHandler = jest.fn()

  const component = render(<Person person={person} onDelete={mockHandler} />)

  expect(component.container).toHaveTextContent(
    person.name,
  )
  expect(component.container).toHaveTextContent(
    person.number,
  )
})
