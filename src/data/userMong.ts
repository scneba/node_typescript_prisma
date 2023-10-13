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
  email: string
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
