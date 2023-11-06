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
exports.createRole = exports.createPermission = exports.createUser = void 0;
const response_1 = require("../../utils/response");
const validate_1 = require("./validate");
const user_1 = require("../../data/user");
const permission_1 = require("../../data/permission");
const role_1 = require("../../data/role");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const gender = req.body.gender;
        const password = req.body.password;
        const roles = req.body.roles;
        try {
            const errs = yield (0, validate_1.validateUser)(firstName, lastName, phone, email, gender, password, roles);
            if (errs.length > 0) {
                (0, response_1.writeBadRequest)(res, errs);
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield (0, user_1.postUser)(firstName, lastName, phone, email, gender, hashedPassword, roles);
            (0, response_1.writeSuccess)(res, user);
        }
        catch (e) {
            console.error(e.message);
            res.status(500).end();
        }
    });
};
exports.createUser = createUser;
const createPermission = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = req.body.name;
            const action = req.body.action;
            const resource = req.body.resource;
            const errs = yield (0, validate_1.validatePermission)(name, action, resource);
            if (errs.length > 0) {
                (0, response_1.writeBadRequest)(res, errs);
                return;
            }
            const perms = yield (0, permission_1.postPermission)(name, action, resource);
            (0, response_1.writeSuccess)(res, perms);
        }
        catch (e) {
            console.error(e);
            res.status(500).end();
        }
    });
};
exports.createPermission = createPermission;
const createRole = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = req.body.name;
            const perms = req.body.permissions;
            const errs = yield (0, validate_1.validateRole)(name, perms);
            if (errs.length > 0) {
                (0, response_1.writeBadRequest)(res, errs);
                return;
            }
            const role = yield (0, role_1.postRole)(name, perms);
            (0, response_1.writeSuccess)(res, role);
        }
        catch (e) {
            console.error(e);
            res.status(500).end();
        }
    });
};
exports.createRole = createRole;
