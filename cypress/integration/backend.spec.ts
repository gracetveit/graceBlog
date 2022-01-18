function resetDatabase() {
  cy.exec('npx prisma db seed');
}

describe('API testing', () => {
  it('returns hello world', () => {
    cy.request('http://localhost:3000/api').as('helloWorld');
    cy.get('@helloWorld').should((response: any) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eq('Hello World');
    });
  });

  describe('Authors', () => {
    xit('returns a 404 status when looking for a user that does not exist', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:3000/api/authors/test',
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
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

    describe('GET', () => {
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

      xit('Returns a single author', () => {
        cy.request('http://localhost:3000/api/authors/grace').as('author');
        cy.get('@author').should((response: any) => {
          expect(response.status).to.eq(200);
          expect(response.body.name).to.eq('Grace');
        });
      });
    });

    /**
     * POST Tests
     */
    describe('POST', () => {
      it('creates a new author', () => {
        resetDatabase();
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
              name: 'Test',
            },
          },
          failOnStatusCode: false,
        }).then((response: any) => {
          expect(response.status).to.eq(500);
        });
        resetDatabase();
      });
    });

    /**
     * PUT Tests
     */
    describe('PUT', () => {
      it('edits an existing author', () => {
        resetDatabase();
        cy.request({
          method: 'PUT',
          url: 'http://localhost:3000/api/authors/grace',
          body: {
            author: {
              name: 'Test',
            },
          },
        }).as('testAuthor');
        cy.get('@testAuthor').should((response: any) => {
          expect(response.status).to.eq(200);
          expect(response.body.name).to.eq('Test');
        });
        resetDatabase();
      });
    });
  });
});
export {};
