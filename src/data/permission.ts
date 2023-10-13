import { Permission } from "../model/permission";
import mongoose, { Types } from "mongoose";

export const postPermission = async function (
  name: string
): Promise<Permission> {
  try {
    if (name) {
      const perm = Permission.create({ name });
      return perm;
    } else {
      throw "Permission name not found";
    }
  } catch (exp) {
    throw exp;
  }
};

export const getPermission = async function (
  id?: string,
  name?: string
): Promise<Permission | null> {
  if (id) {
    return Permission.findById(id);
  }
  if (name) {
    return Permission.findOne({ name });
  }
  return null;
};

export const findPermissions = async function (): Promise<
  Permissions[] | null
> {
  return Permission.find();
};
