import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import "dotenv/config";

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

const user = async () => {
  try {
    await db.user.deleteMany();

    await db.user.create({
      data: {
        username: process.env.CLIENT_USERNAME,
        pwHash: await argon2.hash(process.env.CLIENT_PASSWORD),
        email: process.env.EMAIL,
      },
    });
    console.log("User created!");
  } catch (error) {
    console.error(error);
  }
};

const seed = async () => {
  await post();
  await user();
};

seed()
  .then(() => {
    console.log("Seeded succsessfully!");
  })
  .catch((error: Error) => {
    console.log(error.message);
  });

// export default {};
