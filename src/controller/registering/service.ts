import express, { Express, Request, Response, Application } from "express";
import prisma from "../../../client";

export const _createUser = async function () {
  const rand = Math.random() * 100;
  const email = "alice" + Math.round(rand) + "@prisma.io";
  return await prisma.user.create({
    data: {
      name: "Alice",
      email,
      posts: {
        create: { title: "Hello World" }
      },
      profile: {
        create: { bio: "I like turtles" }
      }
    }
  });
};

export const createUser = async function (req: Request, res: Response) {
  try {
    const user = await _createUser();
    await prisma.$disconnect();
    res.status(200).send(user);
  } catch (e: any) {
    console.error(e);
    await prisma.$disconnect();
    res.status(500).send("Ooops");
  }
};
