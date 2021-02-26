describe('Phonebook', () => {
  it('front page can be opened', () => {
    cy.visit('http://localhost:8000')
    cy.contains('Phonebook')
  })
})
