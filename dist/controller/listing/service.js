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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.getUsers = exports.getRoles = exports.getPermissions = void 0;
const response_1 = require("../../utils/response");
const permission_1 = require("../../data/permission");
const role_1 = require("../../data/role");
const user_1 = require("../../data/user");
const getPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const name = req.query.name;
    try {
        if (id || name) {
            const perms = yield (0, permission_1.getPermission)(id, name);
            (0, response_1.writeSuccess)(res, perms);
        }
        else {
            const perms = yield (0, permission_1.findPermissions)();
            (0, response_1.writeSuccess)(res, perms);
        }
    }
    catch (exp) {
        console.log(exp);
        res.status(500).end();
    }
});
exports.getPermissions = getPermissions;
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const name = req.query.name;
    try {
        if (id || name) {
            const role = yield (0, role_1.getRole)(id, name);
            (0, response_1.writeSuccess)(res, role);
        }
        else {
            const roles = yield (0, role_1.findRole)();
            (0, response_1.writeSuccess)(res, roles);
        }
    }
    catch (exp) {
        console.log(exp);
        res.status(500).end();
    }
});
exports.getRoles = getRoles;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const email = req.query.email;
    try {
        if (id || email) {
            const user = yield (0, user_1.getUser)(id, email);
            (0, response_1.writeSuccess)(res, user);
        }
        else {
            const users = yield (0, user_1.findUsers)();
            (0, response_1.writeSuccess)(res, users);
        }
    }
    catch (exp) {
        console.log(exp);
        res.status(500).end();
    }
});
exports.getUsers = getUsers;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.user.email;
    if (email) {
        try {
            const user = yield (0, user_1.getUser)("", email);
            (0, response_1.writeSuccess)(res, user);
        }
        catch (exp) {
            console.log(exp);
            res.status(500).end();
        }
    }
});
exports.getCurrentUser = getCurrentUser;
