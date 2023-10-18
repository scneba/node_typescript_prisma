import mongoose from "mongoose";
import { User } from "../model/user";

export const postUser = async function (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  gender: "Male" | "Female",
  password: string,
  roles: string[]
) {
  try {
    //no need to use transactions, just a test.
    const session = await mongoose.startSession();
    let savedUser: User | null = null;
    await session.withTransaction(async () => {
      savedUser = await User.create({
        firstName,
        lastName,
        phone,
        email,
        gender,
        password,
        roles
      });
    });
    if (savedUser) {
      return savedUser;
    }
    throw "Unable to save user";
  } catch (exp) {
    throw exp;
  }
};

export const getUser = async function (
  id: string,
  email?: string
): Promise<User | null> {
  if (id) {
    return User.findById(id);
  }
  if (email) {
    return User.findOne({ email });
  }
  return null;
};

export const findUsers = async function (): Promise<User[] | null> {
  return User.find();
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
    return User.findById(id);
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
