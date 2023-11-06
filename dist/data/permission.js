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
exports.deleteDbPermission = exports.findPermissions = exports.getPermission = exports.postPermission = void 0;
const permission_1 = require("../model/permission");
const postPermission = function (name, action, resource) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const perm = permission_1.Permission.create({ name, action, resource });
            return perm;
        }
        catch (exp) {
            throw exp;
        }
    });
};
exports.postPermission = postPermission;
const getPermission = function (id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (id) {
            return permission_1.Permission.findById(id);
        }
        if (name) {
            return permission_1.Permission.findOne({ name });
        }
        return null;
    });
};
exports.getPermission = getPermission;
const findPermissions = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return permission_1.Permission.find();
    });
};
exports.findPermissions = findPermissions;
const deleteDbPermission = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield permission_1.Permission.findOneAndRemove({ _id: id });
        return id;
    });
};
exports.deleteDbPermission = deleteDbPermission;
