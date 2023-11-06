"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRole = exports.validatePermission = exports.validateUser = void 0;
const role_1 = require("../../data/role");
const permission_1 = require("../../model/permission");
const error_builder_1 = require("../../utils/error_builder");
const sharedErrors = __importStar(require("../../utils/shared_errors"));
const user_1 = require("../../data/user");
const permission_2 = require("../../data/permission");
const data_1 = require("../../data");
const validateUser = (firstName, lastName, phone, email, gender, password, roles) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        firstName,
        lastName,
        email,
        phone,
        gender,
        roles
    };
    let errs = [];
    if (!email) {
        errs = (0, error_builder_1.addError)(errs, sharedErrors.Required, "Email  is required", "email", data);
    }
    else {
        //TODO validate email
        const user = yield (0, user_1.getUser)("", email);
        if (user) {
            errs = (0, error_builder_1.addError)(errs, sharedErrors.Exists, "Email already exists", "email", data);
        }
    }
    if (!firstName) {
        errs = (0, error_builder_1.addError)(errs, sharedErrors.Required, "Firstname  is required", "first_name", data);
    }
    if (!phone) {
        errs = (0, error_builder_1.addError)(errs, sharedErrors.Required, "Phone  is required", "phone", data);
    }
    if (!gender) {
        errs = (0, error_builder_1.addError)(errs, sharedErrors.Required, "Gender  is required", "gender", data);
    }
    else {
    }
    if (!password) {
        errs = (0, error_builder_1.addError)(errs, sharedErrors.Required, "Password is required", "password", data);
    }
    if (!roles || roles.length == 0) {
        errs = (0, error_builder_1.addError)(errs, sharedErrors.Required, "role is required", "role", data);
    }
    else {
        for (let roleId of roles) {
            if (!(0, data_1.isObjectIdValid)(roleId)) {
                (0, error_builder_1.addError)(errs, sharedErrors.InvalidObjectId, `role with id ${roleId} is invalid`, "roles", data);
                continue;
            }
            const role = yield (0, role_1.getRole)(roleId);
            if (!role) {
                (0, error_builder_1.addError)(errs, sharedErrors.NotFound, `role with id ${roleId} does not exist`, "roles", data);
            }
        }
    }
    return errs;
});
exports.validateUser = validateUser;
const validatePermission = (name, action, resource) => __awaiter(void 0, void 0, void 0, function* () {
    let errs = [];
    const data = { name, action, resource };
    if (!name) {
        (0, error_builder_1.addError)(errs, sharedErrors.Required, "Permission name is required", "name", data);
    }
    else {
        const perm = yield permission_1.Permission.findOne({ name });
        if (perm) {
            (0, error_builder_1.addError)(errs, sharedErrors.Exists, "Permission name already exist", "name", data);
        }
    }
    if (!action) {
        (0, error_builder_1.addError)(errs, sharedErrors.Required, "Permission action is required", "action", data);
    }
    else if (!data_1.Actions.includes(action)) {
        (0, error_builder_1.addError)(errs, sharedErrors.InvalidAction, "Permission action is invalid, get, list, create or update accepted", "action", data);
    }
    if (!resource) {
        (0, error_builder_1.addError)(errs, sharedErrors.Required, "Permission resource is required", "resource", data);
    }
    else if (!data_1.Resources.includes(resource)) {
        (0, error_builder_1.addError)(errs, sharedErrors.InvalidResource, `Resource ${resource} is invalid`, "resource", data);
    }
    else {
        const perm = yield permission_1.Permission.findOne({ action, resource });
        if (perm) {
            (0, error_builder_1.addError)(errs, sharedErrors.Exists, `Permission with action and resource already exist with name ${perm.name}`, "action", data);
        }
    }
    return errs;
});
exports.validatePermission = validatePermission;
const validateRole = (name, perms) => __awaiter(void 0, void 0, void 0, function* () {
    const data = { name, permissions: perms };
    if (!name) {
        return (0, error_builder_1.buildError)(sharedErrors.Required, "Role name is required", "name", data);
    }
    const role = yield (0, role_1.getRole)("", name);
    if (role) {
        return (0, error_builder_1.buildError)(sharedErrors.Required, `Role with name ${name} already exists`, "name", data);
    }
    if (!perms || perms.length < 1) {
        return (0, error_builder_1.buildError)(sharedErrors.Required, "Permissions are required for role", "permissions", data);
    }
    const errs = [];
    for (let permId of perms) {
        if (!(0, data_1.isObjectIdValid)(permId)) {
            (0, error_builder_1.addError)(errs, sharedErrors.InvalidObjectId, `permission with id ${permId} is invalid`, "permissions", data);
            continue;
        }
        const perm = yield (0, permission_2.getPermission)(permId);
        if (!perm) {
            (0, error_builder_1.addError)(errs, sharedErrors.NotFound, `permission with id ${permId} not found`, "permissions", data);
        }
    }
    return errs;
});
exports.validateRole = validateRole;
