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
export const deleteDbRole = async function (id: string) {
  await Role.findOneAndRemove<Role>({ _id: id });
  return id;
};

export const replaceRole = async function (
  id: string,
  name: string,
  permIds: string[]
) {
  const role = await Role.replaceOne(
    { _id: id },
    { name, permissions: permIds }
  );
  return id;
};
