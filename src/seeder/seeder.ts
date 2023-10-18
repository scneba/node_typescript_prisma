import mongoose from "mongoose";
import { User } from "../model/user";
import { Role } from "../model/role";
import { Permission } from "../model/permission";
import bcrypt from "bcrypt";

// Define custom hex values for ObjectIDs
const permissionObjectId1 = "5f6a3a71b9f6d033a0d171d1";
const permissionObjectId2 = "5f6a3a71b9f6d033a0d171d2";
const permissionObjectId3 = "5f6a3a71b9f6d033a0d171d3";
const roleObjectId1 = "5f6a3a71b9f6d033a0d171d3";
const roleObjectId2 = "5f6a3a71b9f6d033a0d171d4";
const roleObjectId3 = "5f6a3a71b9f6d033a0d171d8";
const userObjectId1 = "5f6a3a71b9f6d033a0d171d5";
const userObjectId2 = "5f6a3a71b9f6d033a0d171d6";
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
