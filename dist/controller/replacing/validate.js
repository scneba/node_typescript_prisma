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
exports.validateRoleForReplacement = void 0;
const role_1 = require("../../data/role");
const error_builder_1 = require("../../utils/error_builder");
const sharedError = __importStar(require("../../utils/shared_errors"));
const permission_1 = require("../../data/permission");
const data_1 = require("../../data");
const validateRoleForReplacement = (id, name, perms) => __awaiter(void 0, void 0, void 0, function* () {
    const data = { name, permissions: perms };
    if (!id) {
        return (0, error_builder_1.buildError)(sharedError.Required, "Role id is required", "id", data);
    }
    if (!(0, data_1.isObjectIdValid)(id)) {
        return (0, error_builder_1.buildError)(sharedError.InvalidObjectId, "Invalid object id", "id", data);
    }
    const errs = [];
    const role = yield (0, role_1.getRole)(id);
    if (!role) {
        (0, error_builder_1.addError)(errs, sharedError.NotFound, "Role with id not found", "id", data);
    }
    if (!name) {
        (0, error_builder_1.addError)(errs, sharedError.Required, `Role name is required`, "name", data);
    }
    const r = yield (0, role_1.getRole)("", name);
    if (r && r._id.toHexString() != id) {
        (0, error_builder_1.addError)(errs, sharedError.Exists, `Role with name ${name} already exists`, "name", data);
    }
    if (!perms || perms.length < 1) {
        return (0, error_builder_1.buildError)(sharedError.Required, "Permissions are required for role", "permissions", data);
    }
    for (let permId of perms) {
        if (!(0, data_1.isObjectIdValid)(permId)) {
            (0, error_builder_1.addError)(errs, sharedError.InvalidObjectId, `permission with id ${permId} is invalid`, "permissions", data);
            continue;
        }
        const perm = yield (0, permission_1.getPermission)(permId);
        if (!perm) {
            (0, error_builder_1.addError)(errs, sharedError.NotFound, `permission with id ${permId} not found`, "permissions", data);
        }
    }
    return errs;
});
exports.validateRoleForReplacement = validateRoleForReplacement;
