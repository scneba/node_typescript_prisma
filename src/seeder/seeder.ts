import mongoose from "mongoose";
import { User } from "../model/user";
import { Role } from "../model/role";
import { Permission } from "../model/permission";
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
const password1 = bcrypt.hashSync("some pass", 10);

// Connect to your MongoDB database
mongoose.connect("mongodb://localhost:27017/hail");

// Sample data to seed the database with pre-generated ObjectIDs
const permissionData: Permission[] = [
  {
    _id: new mongoose.Types.ObjectId(permissionObjectId1),
    name: "read roles",
    action: "get",
    resource: "roles"
  },
  {
    _id: new mongoose.Types.ObjectId(permissionObjectId2),
    name: "create roles",
    action: "create",
    resource: "roles"
  },
  {
    _id: new mongoose.Types.ObjectId(permissionObjectId3),
    name: "update roles",
    action: "update",
    resource: "roles"
  }
];

const roleData: Role[] = [
  {
    _id: new mongoose.Types.ObjectId(roleObjectId1),
    name: "admin",
    permissions: [permissionData[0]]
  },
  {
    _id: new mongoose.Types.ObjectId(roleObjectId2),
    name: "admin2",
    permissions: [permissionData[0], permissionData[1]]
  },
  {
    _id: new mongoose.Types.ObjectId(roleObjectId3),
    name: "reader",
    permissions: [permissionData[0], permissionData[1]]
  }
];

const userData: User[] = [
  {
    _id: new mongoose.Types.ObjectId(userObjectId1),
    firstName: "user1",
    lastName: "lastname",
    email: "user1@example.com",
    gender: "Male",
    password: password1,
    phone: "85848584489433",
    roles: [roleData[0]]
  },
  {
    _id: new mongoose.Types.ObjectId(userObjectId2),
    firstName: "user2",
    lastName: "lastname2",
    email: "user2@example.com",
    gender: "Female",
    password: password1,
    phone: "95848584489433",
    roles: [roleData[1]]
  }
];

async function seedDatabase() {
  try {
    // Clear existing data if needed
    await User.deleteMany({});
    await Role.deleteMany({});
    await Permission.deleteMany({});

    // Seed permissions
    await Permission.insertMany(permissionData);

    // Seed roles
    await Role.insertMany(roleData);
    // Seed users
    await User.insertMany(userData);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Disconnect from the database
    mongoose.disconnect();
  }
}

seedDatabase();
