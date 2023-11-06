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
exports.getUserPermissions = exports.updateDBPassword = exports.updateDBUser = exports.findUsers = exports.getUser = exports.postUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../model/user");
const postUser = function (firstName, lastName, phone, email, gender, password, roles) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //no need to use transactions, just a test.
            const session = yield mongoose_1.default.startSession();
            let savedUser = null;
            yield session.withTransaction(() => __awaiter(this, void 0, void 0, function* () {
                savedUser = yield user_1.User.create({
                    firstName,
                    lastName,
                    phone,
                    email,
                    gender,
                    password,
                    roles
                });
            }));
            if (savedUser) {
                return savedUser;
            }
            throw "Unable to save user";
        }
        catch (exp) {
            throw exp;
        }
    });
};
exports.postUser = postUser;
const getUser = function (id, email, includePassword = false) {
    return __awaiter(this, void 0, void 0, function* () {
        if (id) {
            if (includePassword)
                return user_1.User.findById(id).populate("roles");
            else
                return user_1.User.findById(id).select("-password").populate("roles");
        }
        if (email) {
            if (includePassword)
                return user_1.User.findOne({ email }).populate("roles");
            else
                return user_1.User.findOne({ email }).select("-password").populate("roles");
        }
        return null;
    });
};
exports.getUser = getUser;
const findUsers = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return user_1.User.find().select("-password");
    });
};
exports.findUsers = findUsers;
const updateDBUser = function (id, firstName, lastName, phone, gender, roles) {
    return __awaiter(this, void 0, void 0, function* () {
        const updates = {};
        if (firstName) {
            updates.firstName = firstName;
        }
        if (lastName) {
            updates.lastName = lastName;
        }
        if (phone) {
            updates.phone = phone;
        }
        if (gender) {
            updates.gender = gender;
        }
        if (roles && roles.length > 0) {
            updates.roles = roles;
        }
        try {
            yield user_1.User.updateOne({ _id: id }, updates);
            return user_1.User.findById(id).populate("roles");
        }
        catch (exp) {
            throw exp;
        }
    });
};
exports.updateDBUser = updateDBUser;
const updateDBPassword = function (id, newPass) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_1.User.updateOne({ _id: id }, { password: newPass });
    });
};
exports.updateDBPassword = updateDBPassword;
const getUserPermissions = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const perms = yield user_1.User.findOne({ email })
            .select("roles")
            .populate([
            {
                path: "roles",
                select: "permissions",
                populate: {
                    path: "permissions",
                    select: "action resource"
                }
            }
        ])
            .exec();
        return perms;
    });
};
exports.getUserPermissions = getUserPermissions;
