import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

// Define custom hex values for ObjectIDs
const permissionObjectId1 = "7ce65b0c-732e-445a-a611-16f61a6882e5";
const permissionObjectId2 = "d5b5d0a3-dc7c-45b5-a2fa-2c5958dee628";
const permissionObjectId3 = "3118877c-fdb0-43d3-aacf-0c9096c4cc94";
const roleObjectId1 = "a4d4e526-f796-4925-a952-f2b0c493d4fb";
const roleObjectId2 = "9a9350e4-fe75-41a9-852a-20f719685685";
const roleObjectId3 = "8525e4cb-c29f-4695-adf1-d97bf3b68586";
const userObjectId1 = "4bc06ab0-69e9-4419-b481-a85a5ea556d5";
const userObjectId2 = "fea6363f-2203-4492-a93b-f147a4177d91";
const portfolioId1 = "a3ae7ed1-7d05-40da-8c7e-9fcecadb01b2";
const rp1 = "d20a2140-bc90-4018-aede-2426695faeaa";
const rp2 = "a33fa273-127f-4f5c-a3d8-07624a7a351c";
const ur1 = "97af2efa-3c6d-41d4-9b4e-d9b37dd9232b";
const ur2 = "c0779132-a9cc-4b36-b337-5cfff2d8407c";
const password1 = bcrypt.hashSync("some pass", 10);

const prisma = new PrismaClient();
async function main() {
  await prisma.rolePermission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.user.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.portfolio.deleteMany();
  const perm1 = await prisma.permission.upsert({
    where: { id: permissionObjectId1 },
    update: {},
    create: {
      id: permissionObjectId1,
      name: "read roles",
      action: "get",
      resource: "roles"
    }
  });
  const perms2 = await prisma.permission.upsert({
    where: { id: permissionObjectId2 },
    update: {},
    create: {
      id: permissionObjectId2,
      name: "create roles",
      action: "create",
      resource: "roles"
    }
  });

  const perms3 = await prisma.permission.upsert({
    where: { id: permissionObjectId3 },
    update: {},
    create: {
      id: permissionObjectId3,
      name: "get permissions",
      action: "get",
      resource: "permissions"
    }
  });

  const role1 = await prisma.role.upsert({
    where: { id: roleObjectId1 },
    update: {},
    create: {
      id: roleObjectId1,
      name: "admin"
    }
  });
  const role2 = await prisma.role.upsert({
    where: { id: roleObjectId2 },
    update: {},
    create: {
      id: roleObjectId2,
      name: "admin2"
    }
  });
  const role3 = await prisma.role.upsert({
    where: { id: roleObjectId3 },
    update: {},
    create: {
      id: roleObjectId3,
      name: "reader"
    }
  });

  const port1 = await prisma.portfolio.upsert({
    where: { id: portfolioId1 },
    update: {},
    create: { id: portfolioId1, name: "CM" }
  });

  const user1 = await prisma.user.upsert({
    where: { id: userObjectId1 },
    update: {},
    create: {
      id: userObjectId1,
      firstName: "user1",
      lastName: "lastname",
      email: "user1@example.com",
      username: "user1@example.com",
      gender: "MALE",
      password: password1,
      phone: "85848584489433"
    }
  });
  const user2 = await prisma.user.upsert({
    where: { id: userObjectId2 },
    update: {},
    create: {
      id: userObjectId2,
      firstName: "user2",
      lastName: "lastname2",
      email: "user2@example.com",
      gender: "FEMALE",
      password: password1,
      phone: "95848584489433",
      username: "user2@example.com"
    }
  });

  //assign permissions to roles
  await prisma.rolePermission.upsert({
    where: {
      roledId_permissionId: { roledId: role1.id, permissionId: perm1.id }
    },
    update: {},
    create: {
      roledId: role1.id,
      permissionId: perm1.id
    }
  });

  await prisma.rolePermission.upsert({
    where: {
      roledId_permissionId: { roledId: role1.id, permissionId: perms2.id }
    },
    update: {},
    create: {
      roledId: role1.id,
      permissionId: perms2.id
    }
  });
  await prisma.rolePermission.upsert({
    where: {
      roledId_permissionId: { roledId: role1.id, permissionId: perms3.id }
    },
    update: {},
    create: {
      roledId: role1.id,
      permissionId: perms3.id
    }
  });

  //assign roles to users
  const ur1 = await prisma.userRole.upsert({
    where: {
      userId_roleId_portfolioId: {
        userId: user1.id,
        roleId: role1.id,
        portfolioId: port1.id
      }
    },
    update: {},
    create: {
      roleId: role1.id,
      userId: user1.id,
      portfolioId: port1.id,
      assignedBy: "user1@example.com"
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
