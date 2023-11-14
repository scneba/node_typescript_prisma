import mongoose from "mongoose";
import { User } from "../model/user";
import prisma from "../prismaclient";
import { Prisma, User as Users, Gender } from "@prisma/client";

export const postUser = async function (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  gender: "Male" | "Female",
  password: string,
  roles: string[]
): Promise<Partial<Users> | null> {
  let g: Gender = Gender.MALE;
  if (gender === "Female") {
    g = Gender.FEMALE;
  }
  const { id } = await prisma.user.create({
    data: {
      firstName,
      lastName,
      phone,
      email,
      username: email,
      password,
      gender: g
    }
  });
  return getUser(id);
};

export const getUser = async function (
  id: string,
  email?: string,
  includePassword: boolean = false
): Promise<Partial<Users> | null> {
  if (!id && !email) {
    return null;
  }
  const where = {} as any;
  if (id) {
    where.id = id;
  }
  if (email) {
    where.email = email;
  }

  if (includePassword) {
    return prisma.user.findUnique({ where });
  } else {
    return prisma.user.findUnique({
      where,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        gender: true,
        phone: true,
        createdAt: true,
        username: true,
        password: false
      }
    });
  }
};

export const findUsers = async function (): Promise<Partial<Users>[] | null> {
  return prisma.user.findMany({ select: { password: false } });
};

export const updateDBUser = async function (
  id: string,
  firstName: string,
  lastName: string,
  phone: string,
  gender: "Male" | "Female",
  roles: string[]
): Promise<User | null> {
  const updates: Partial<Omit<User, "email" | "password" | "roles">> & {
    roles?: string[];
  } = {};
  if (firstName) {
    updates.firstName = firstName;
  }
  if (lastName) {
    updates.lastName = lastName;
  }
  if (phone) {
    updates.phone = phone;
  }
  if (gender) {
    updates.gender = gender;
  }
  if (roles && roles.length > 0) {
    updates.roles = roles;
  }
  try {
    await User.updateOne({ _id: id }, updates);
    return User.findById(id).populate("roles");
  } catch (exp) {
    throw exp;
  }
};
export const updateDBPassword = async function (id: string, newPass: string) {
  return User.updateOne({ _id: id }, { password: newPass });
};

export const getUserPermissions = async function (email: string) {
  const perms = await User.findOne({ email })
    .select("roles")
    .populate([
      {
        path: "roles",
        select: "permissions",
        populate: {
          path: "permissions",
          select: "action resource"
        }
      }
    ])
    .exec();
  return perms;
};
