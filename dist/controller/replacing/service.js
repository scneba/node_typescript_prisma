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
exports.putRole = void 0;
const validate_1 = require("./validate");
const response_1 = require("../../utils/response");
const role_1 = require("../../data/role");
const putRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const name = req.body.name;
    const perms = req.body.permissions;
    try {
        const errs = yield (0, validate_1.validateRoleForReplacement)(id, name, perms);
        if (errs.length > 0) {
            (0, response_1.writeBadRequest)(res, errs);
            return;
        }
        const data = yield (0, role_1.replaceRole)(id, name, perms);
        (0, response_1.writeSuccess)(res, data, []);
    }
    catch (e) {
        console.error(e);
        res.status(500).end();
    }
});
exports.putRole = putRole;
