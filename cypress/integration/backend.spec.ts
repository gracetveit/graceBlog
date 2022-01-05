describe("API testing", () => {
  it('returns hello world', () => {
    cy.request('http://localhost:3000/api').as('helloWorld');
    cy.get('@helloWorld').should((response: any) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('Hello World')
    })
  })
})
export{}