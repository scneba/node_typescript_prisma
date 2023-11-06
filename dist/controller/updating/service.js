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
exports.updatePassword = exports.updateUser = void 0;
const validate_1 = require("./validate");
const response_1 = require("../../utils/response");
const user_1 = require("../../data/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;
    const gender = req.body.gender;
    const roles = req.body.roles;
    try {
        const errs = yield (0, validate_1.validateUser)(id, firstName, lastName, phone, gender, roles);
        if (errs.length > 0) {
            (0, response_1.writeBadRequest)(res, errs);
            return;
        }
        const user = yield (0, user_1.updateDBUser)(id, firstName, lastName, phone, gender, roles);
        (0, response_1.writeSuccess)(res, user);
    }
    catch (ex) {
        console.error(ex);
        res.status(500).end();
    }
});
exports.updateUser = updateUser;
const updatePassword = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        const oldPass = req.body.oldPassword;
        const newPass = req.body.newPassword;
        try {
            const errs = yield (0, validate_1.validatePasswordUpdate)(id, oldPass, newPass);
            if (errs.length > 0) {
                (0, response_1.writeBadRequest)(res, errs);
                return;
            }
            const hashedPassword = yield bcrypt_1.default.hash(newPass, 10);
            yield (0, user_1.updateDBPassword)(id, hashedPassword);
            (0, response_1.writeSuccess)(res);
        }
        catch (ex) {
            console.error(ex);
            res.status(500).end();
        }
    });
};
exports.updatePassword = updatePassword;
