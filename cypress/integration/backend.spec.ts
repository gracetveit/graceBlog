describe('API testing', () => {
  it('returns hello world', () => {
    cy.request('http://localhost:3000/api').as('helloWorld');
    cy.get('@helloWorld').should((response: any) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('Hello World');
    });
  });

  describe('Authors', () => {
    it('Returns all authors', () => {
      cy.request('http://localhost:3000/api/authors').as('authors');
      cy.get('@authors').should((response: any) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.a('Array');
        response.body.forEach((element) => {
          expect(element).to.have.property('name');
          expect(element).to.have.property('id');
        });
      });
    });

    it ("sends a 405 when encountering an unsupported method", () => {
      cy.request({
        method: 'HEAD', 
        url: 'http://localhost:3000/api/authors',
        failOnStatusCode: false
      }).then(
        (response: any) => {
          expect(response.status).to.eq(405)
        }
      );
    
    })
  });
});
export {};
