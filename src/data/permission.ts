import { Permission } from "../model/permission";
import mongoose, { Types } from "mongoose";

export const postPermission = async function (
  name: string,
  action: string,
  resource: string
): Promise<Permission> {
  try {
    const perm = Permission.create({ name, action, resource });
    return perm;
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
