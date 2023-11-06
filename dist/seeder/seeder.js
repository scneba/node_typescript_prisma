"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../model/user");
const role_1 = require("../model/role");
const permission_1 = require("../model/permission");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Define custom hex values for ObjectIDs
const permissionObjectId1 = "5f6a3a71b9f6d033a0d171d1";
const permissionObjectId2 = "5f6a3a71b9f6d033a0d171d2";
const permissionObjectId3 = "5f6a3a71b9f6d033a0d171d3";
const roleObjectId1 = "5f6a3a71b9f6d033a0d171d3";
const roleObjectId2 = "5f6a3a71b9f6d033a0d171d4";
const roleObjectId3 = "5f6a3a71b9f6d033a0d171d8";
const userObjectId1 = "5f6a3a71b9f6d033a0d171d5";
const userObjectId2 = "5f6a3a71b9f6d033a0d171d6";
const password1 = bcrypt_1.default.hashSync("some pass", 10);
// Connect to your MongoDB database
mongoose_1.default.connect("mongodb://localhost:27017/hail");
// Sample data to seed the database with pre-generated ObjectIDs
const permissionData = [
    {
        _id: new mongoose_1.default.Types.ObjectId(permissionObjectId1),
        name: "read roles",
        action: "get",
        resource: "roles"
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(permissionObjectId2),
        name: "create roles",
        action: "create",
        resource: "roles"
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(permissionObjectId3),
        name: "update roles",
        action: "update",
        resource: "roles"
    }
];
const roleData = [
    {
        _id: new mongoose_1.default.Types.ObjectId(roleObjectId1),
        name: "admin",
        permissions: [permissionData[0]]
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(roleObjectId2),
        name: "admin2",
        permissions: [permissionData[0], permissionData[1]]
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(roleObjectId3),
        name: "reader",
        permissions: [permissionData[0], permissionData[1]]
    }
];
const userData = [
    {
        _id: new mongoose_1.default.Types.ObjectId(userObjectId1),
        firstName: "user1",
        lastName: "lastname",
        email: "user1@example.com",
        gender: "Male",
        password: password1,
        phone: "85848584489433",
        roles: [roleData[0]]
    },
    {
        _id: new mongoose_1.default.Types.ObjectId(userObjectId2),
        firstName: "user2",
        lastName: "lastname2",
        email: "user2@example.com",
        gender: "Female",
        password: password1,
        phone: "95848584489433",
        roles: [roleData[1]]
    }
];
function seedDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Clear existing data if needed
            yield user_1.User.deleteMany({});
            yield role_1.Role.deleteMany({});
            yield permission_1.Permission.deleteMany({});
            // Seed permissions
            yield permission_1.Permission.insertMany(permissionData);
            // Seed roles
            yield role_1.Role.insertMany(roleData);
            // Seed users
            yield user_1.User.insertMany(userData);
            console.log("Database seeded successfully.");
        }
        catch (error) {
            console.error("Error seeding the database:", error);
        }
        finally {
            // Disconnect from the database
            mongoose_1.default.disconnect();
        }
    });
}
seedDatabase();
