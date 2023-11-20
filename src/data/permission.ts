import { Permission } from "@prisma/client";
import prisma from "../prismaclient";

export const postPermission = async function (
  name: string,
  action: string,
  resource: string
): Promise<Permission> {
  return prisma.permission.create({ data: { name, action, resource } });
};

export const getPermission = async function ({
  id,
  name,
  action,
  resource
}: {
  id?: string;
  name?: string;
  action?: string;
  resource?: string;
}): Promise<Permission | null> {
  if (id) {
    return prisma.permission.findUnique({ where: { id } });
  }
  if (name) {
    return prisma.permission.findUnique({ where: { name } });
  }
  if (action && resource) {
    return prisma.permission.findFirst({ where: { action, resource } });
  }

  return null;
};

export const findPermissions = async function (): Promise<Permission[] | null> {
  return prisma.permission.findMany();
};
export const deleteDbPermission = async function (id: string) {
  const perm = await prisma.permission.delete({ where: { id } });
  return perm.id;
};
