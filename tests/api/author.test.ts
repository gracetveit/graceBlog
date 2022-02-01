import request from 'supertest';
import prisma from '../../prisma/client';

describe('Author API', () => {
  beforeEach(async () => {
    await prisma.author.deleteMany();
  });

  it('Returns all authors', async () => {
    await prisma.author.create({ data: { name: 'test' } });
    const res = await request('http://localhost:3000/api')
      .get('/authors')
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0].name).toBe('test');
  });
});

export {};
