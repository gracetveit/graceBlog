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

    it('sends a 405 when encountering an unsupported method', () => {
      cy.request({
        method: 'HEAD',
        url: 'http://localhost:3000/api/authors',
        failOnStatusCode: false,
      }).then((response: any) => {
        expect(response.status).to.eq(405);
      });
    });

    it('creates a new author', () => {
      cy.exec('npx prisma db seed');
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/authors',
        body: {
          author: {
            name: 'Test',
          },
        },
      }).as('testAuthor');
      cy.get('@testAuthor').should((response: any) => {
        expect(response.status).to.eq(201);
        expect(response.body.name).to.eq('Test');
      });
    });

    it('Sends an error when creating duplicate authors', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/authors',
        body: {
          author: {
            name: 'Test'
          }
        },
        failOnStatusCode: false
      }).then((response: any) => {
        expect(response.status).to.eq(500)
      })
    })
  });
});
export {};
