import { Permission } from "../model/permission";

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
export const deleteDbPermission = async function (id: string) {
  await Permission.findOneAndRemove<Permission>({ _id: id });
  return id;
};
