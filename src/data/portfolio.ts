import { Portfolio } from "@prisma/client";
import prisma from "../prismaclient";

export const postPortfolio = async (name: string): Promise<Portfolio> => {
  const port = await prisma.portfolio.create({ data: { name } });
  return port;
};

export const getPortfolio = async (
  id: string,
  name: string
): Promise<Portfolio | null> => {
  let where = {} as any;
  if (id) {
    where.id = id;
  } else if (name) {
    where.name = name;
  }
  const port = await prisma.portfolio.findUnique({ where });
  return port;
};

export const getAllPortofolio = async function () {
  return prisma.portfolio.findMany();
};

export const deleteDBPortfolio = async function (id: string) {
  const user = await prisma.portfolio.delete({ where: { id } });
  return user.id;
};
