describe('Frontend', () => {
  it('should navigate to the front page', () => {
    cy.visit('http://localhost:3000');

    cy.get('h1').contains('Hello World');
  });
});
export {};
