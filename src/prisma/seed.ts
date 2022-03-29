import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const post = async () => {
  try {
    await db.blog.deleteMany();

    await db.blog.create({
      data: {
        title: "Test",
        slug: "test",
        content: "testing",
      },
    });
    console.log("Blogs created!");
  } catch (error) {
    console.error(error);
  }
};

const seed = async () => {
  await post();
};

seed()
  .then(() => {
    console.log("Seeded succsessfully!");
  })
  .catch((error: Error) => {
    console.log(error.message);
  });

// export default {};
