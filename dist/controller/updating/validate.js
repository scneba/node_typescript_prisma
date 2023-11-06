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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswordUpdate = exports.validateUser = void 0;
const data_1 = require("../../data");
const role_1 = require("../../data/role");
const user_1 = require("../../data/user");
const error_builder_1 = require("../../utils/error_builder");
const sharedErrors = __importStar(require("../../utils/shared_errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const errors_1 = require("./errors");
const validateUser = (id, firstName, lastName, phone, gender, roles) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id,
        first_name: firstName,
        last_name: lastName,
        phone,
        gender,
        roles
    };
    let errs = [];
    if (!(0, data_1.isObjectIdValid)(id)) {
        (0, error_builder_1.addError)(errs, sharedErrors.InvalidObjectId, `Object id ${id} is invalid`, "id", data);
    }
    else {
        const user = yield (0, user_1.getUser)(id);
        if (!user) {
            (0, error_builder_1.addError)(errs, sharedErrors.NotFound, `user with id ${id} not found`, "id", data);
        }
    }
    if (phone) {
        //TODO validate phone number
    }
    if (gender && !gender.includes(gender)) {
        errs = (0, error_builder_1.addError)(errs, sharedErrors.InvalidGender, "Gender  is invalid, shoulde be Male or Female", "gender", data);
    }
    if (roles && roles.length > 0) {
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
const validatePasswordUpdate = (id, oldPass, newPass) => __awaiter(void 0, void 0, void 0, function* () {
    const errs = [];
    if (!(0, data_1.isObjectIdValid)(id)) {
        (0, error_builder_1.addError)(errs, sharedErrors.InvalidObjectId, `Object id ${id} is invalid`, "id", { id });
    }
    else {
        const user = yield (0, user_1.getUser)(id, "", true);
        if (!user) {
            (0, error_builder_1.addError)(errs, sharedErrors.NotFound, `user with id ${id} not found`, "id", { id });
        }
        else {
            const match = yield bcrypt_1.default.compare(oldPass, user.password);
            if (!match) {
                (0, error_builder_1.addError)(errs, errors_1.InvalidPassword, "Invalid password", "oldPassword");
            }
        }
        if (!newPass) {
            (0, error_builder_1.addError)(errs, sharedErrors.Required, "New password required", "newPassword");
        }
        return errs;
    }
    return errs;
});
exports.validatePasswordUpdate = validatePasswordUpdate;
