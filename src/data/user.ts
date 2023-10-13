import prisma from "../../client";
import { Prisma } from "@prisma/client";

export const postUser = async function createUser(
  userData: Prisma.UserCreateInput
) {
  try {
    const user = await prisma.user.create({
      data: userData
    });
    await prisma.$disconnect();
    return user;
  } catch (exp) {
    await prisma.$disconnect();
    throw exp;
  }
};
