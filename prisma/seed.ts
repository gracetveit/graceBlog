import prisma from './client';

async function main() {
  // Initialize test data
  const grace = { name: 'Grace' };
  const test = { name: 'Test' };

  // Clear any test data in database
  try {
    await prisma.author.delete({ where: grace });
    await prisma.author.delete({ where: test });
  } catch (error) {}

  // Re-seed with test data
  await prisma.author.create({ data: grace });
}

main();
export default main;
