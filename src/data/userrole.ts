import prisma from "../prismaclient";

export const assignRole = async function (
  userId: string,
  portfolioId: string,
  assignedBy: string,
  roleIds: string[]
): Promise<number> {
  let count = 0;
  for (let roleId of roleIds) {
    const exists = await userRoleExists(userId, roleId, portfolioId);
    if (!exists) {
      await prisma.userRole.create({
        data: { assignedBy, roleId, userId, portfolioId }
      });
      count++;
    }
  }

  return count;
};
export const unassignDBRole = async function (
  userId: string,
  portfolioId: string,
  roleIds: string[]
): Promise<number> {
  let count = 0;
  for (let roleId of roleIds) {
    await prisma.userRole.deleteMany({
      where: { roleId, userId, portfolioId }
    });
    count++;
  }

  return count;
};

export const userRoleExists = async function (
  userId: string,
  roleId: string,
  portfolioId: string
): Promise<boolean> {
  const exist = await prisma.userRole.findFirst({
    where: { roleId, userId, portfolioId }
  });
  if (!exist) {
    return false;
  }
  return true;
};
