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
exports.replaceRole = exports.deleteDbRole = exports.findRole = exports.getRole = exports.postRole = void 0;
const role_1 = require("../model/role");
const postRole = (name, permIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = role_1.Role.create({ name, permissions: permIds });
        return role;
    }
    catch (exp) {
        throw exp;
    }
});
exports.postRole = postRole;
const getRole = function (id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        if (id) {
            return role_1.Role.findById(id);
        }
        if (name) {
            return role_1.Role.findOne({ name });
        }
        return null;
    });
};
exports.getRole = getRole;
const findRole = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return role_1.Role.find();
    });
};
exports.findRole = findRole;
const deleteDbRole = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield role_1.Role.findOneAndRemove({ _id: id });
        return id;
    });
};
exports.deleteDbRole = deleteDbRole;
const replaceRole = function (id, name, permIds) {
    return __awaiter(this, void 0, void 0, function* () {
        const role = yield role_1.Role.replaceOne({ _id: id }, { name, permissions: permIds });
        return id;
    });
};
exports.replaceRole = replaceRole;
