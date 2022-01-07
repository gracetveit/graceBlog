import prisma from './client';

// Initialize test data
const grace = { name: 'Grace' };

// Clear any test data in database
prisma.author.delete({ where: grace });

// Re-seed with test data
prisma.author.create({ data: grace });
