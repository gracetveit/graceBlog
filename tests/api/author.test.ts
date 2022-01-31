import request from 'supertest';

describe('Author API', () => {
  it('Returns all authors', () => {
    request('http://localhost:3000/api').get('/').expect(200);
  });
});

export {};
