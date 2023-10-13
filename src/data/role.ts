import { Permission } from "../model/permission";
import { Role } from "../model/role";

export const postRole = async (
  name: string,
  permIds: string[]
): Promise<Role> => {
  try {
    const role = Role.create({ name, permissions: permIds });
    return role;
  } catch (exp) {
    throw exp;
  }
};

export const getRole = async function (
  id?: string,
  name?: string
): Promise<Role | null> {
  if (id) {
    return Role.findById(id);
  }
  if (name) {
    return Role.findOne({ name });
  }
  return null;
};

export const findRole = async function (): Promise<Role[] | null> {
  return Role.find();
};
