import mongoose from "mongoose";
import prisma from "../prismaclient";
import { User, Gender, Permission } from "@prisma/client";

export const postUser = async function (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  gender: "Male" | "Female",
  password: string,
  roles: string[]
): Promise<Partial<User> | null> {
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
): Promise<Partial<User> | null> {
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

export const findUsers = async function (): Promise<Partial<User>[] | null> {
  return prisma.user.findMany({ select: { password: false } });
};

export const updateDBUser = async function (
  id: string,
  firstName: string,
  lastName: string,
  phone: string,
  gender: "Male" | "Female",
  roles: string[]
): Promise<Partial<User> | null> {
  let g: Gender = Gender.MALE;
  if (gender === "Female") {
    g = Gender.FEMALE;
  }
  const updates = {} as any;
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
    updates.gender = g;
  }
  //TODO update roles
  // if (roles && roles.length > 0) {
  //   updates.roles = roles;
  // }
  try {
    await prisma.user.update({ where: { id }, data: updates });
    return getUser(id);
  } catch (exp) {
    throw exp;
  }
};
export const updateDBPassword = async function (id: string, newPass: string) {
  return prisma.user.update({ where: { id }, data: { password: newPass } });
};

export const getUserPermissions = async function (
  email: string
): Promise<Permission[]> {
  const perms: Permission[] = await prisma.$queryRaw`
  SELECT p.id, p.name, p.action, p.resource, p.created_at
FROM "users" u
JOIN "user_roles" ur ON u.id = ur.user_id
JOIN "roles" r ON ur.role_id = r.id
JOIN "role_permissions" rp ON r.id = rp.role_id
JOIN "permissions" p ON rp.permission_id = p.id
WHERE u.email = ${email};
`;
  if (perms && perms.length > 0) {
    return perms;
  }
  return [];
};
