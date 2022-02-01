import request from 'supertest';
import prisma from '../../prisma/client';
import { expect } from '@jest/globals';

describe('Author API', () => {
  const app = 'http://localhost:3000/api';

  beforeEach(async () => {
    await prisma.author.deleteMany();
  });

  describe('GET', () => {
    it('Returns all authors', async () => {
      await prisma.author.create({ data: { name: 'test' } });
      const res = await request(app).get('/authors').expect(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body[0].name).toBe('test');
    });

    it('Returns a single author', async () => {
      const { id } = await prisma.author.create({ data: { name: 'test' } });
      const res = await request(app).get(`/authors/${id}`).expect(200);
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toBe('test');
    });
  });

  describe('POST', () => {
    it('creates a new author', async () => {
      const author = { name: 'POST test' };
      const res = await request(app).post('/authors').send(author).expect(201);
      expect(res.body.name).toBe('POST test');
    });
  });
});

export {};
