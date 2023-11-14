import { Permission } from "../model/permission";
import { Role, RolePermission, UserRole } from "@prisma/client";
import prisma from "../prismaclient";

export const postRole = async (name: string, permIds: string[]) => {
  const id = await prisma.$transaction(async (tx) => {
    const { id } = await tx.role.create({ data: { name } });
    for (const permId of permIds) {
      await tx.rolePermission.create({
        data: { roledId: id, permissionId: permId }
      });
    }
    return id;
  });
  const role = await getRole(id);
  return role;
};

export const getRole = async function (
  id?: string,
  name?: string
): Promise<Record<string, any> | null> {
  if (!id && !name) {
    return null;
  }

  let query = `
  SELECT r.id AS id, r.name AS name,
  (
    SELECT
      ARRAY(
        SELECT jsonb_build_object(
          'id', p.id,
          'name', p.name,
          'action', p.action,
          'resource', p.resource
        )
        FROM role_permissions AS rp
        JOIN permissions AS p ON rp.permission_id = p.id
        WHERE rp.role_id = r.id
      )
  ) AS permissions
  FROM
    roles AS r`;

  if (id) {
    query += ` WHERE  r.id = '${id}' LIMIT 1;`;
  } else if (name) {
    query += ` WHERE r.name = '${name}' LIMIT 1;`;
  }

  const role: Record<string, any>[] = await prisma.$queryRawUnsafe(query);
  if (role && role.length == 1) {
    return role[0];
  }
  return null;
};

export const findRole = async function () {
  return prisma.role.findMany();
};
export const deleteDbRole = async function (id: string) {
  const user = await prisma.role.delete({ where: { id } });
  return user.id;
};

export const replaceRole = async function (
  id: string,
  name: string,
  permIds: string[]
) {
  await prisma.$transaction(async (tx) => {
    await tx.rolePermission.deleteMany({ where: { roledId: id } });
    await tx.role.update({ where: { id }, data: { name } });
    for (const permId of permIds) {
      await tx.rolePermission.create({
        data: { roledId: id, permissionId: permId }
      });
    }
  });

  const role = await getRole(id);
  return role;
};
