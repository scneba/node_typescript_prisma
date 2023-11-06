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
exports.deleteRole = exports.deletePermission = void 0;
const error_builder_1 = require("../../utils/error_builder");
const errors_1 = require("./errors");
const permission_1 = require("../../data/permission");
const response_1 = require("../../utils/response");
const role_1 = require("../../data/role");
const data_1 = require("../../data");
const deletePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!(0, data_1.isObjectIdValid)(id)) {
        const errs = (0, error_builder_1.buildError)(errors_1.InvalidObjectId, `Object id ${id} is invalid`, "id", { id });
        (0, response_1.writeBadRequest)(res, errs);
        return;
    }
    try {
        const permId = yield (0, permission_1.deleteDbPermission)(id);
        (0, response_1.writeSuccess)(res, permId, []);
    }
    catch (e) {
        console.error(e);
        res.status(500).end();
    }
});
exports.deletePermission = deletePermission;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!(0, data_1.isObjectIdValid)(id)) {
        const errs = (0, error_builder_1.buildError)(errors_1.InvalidObjectId, `Object id ${id} is invalid`, "id", { id });
        (0, response_1.writeBadRequest)(res, errs);
        return;
    }
    try {
        const permId = yield (0, role_1.deleteDbRole)(id);
        (0, response_1.writeSuccess)(res, permId, []);
    }
    catch (e) {
        console.error(e);
        res.status(500).end();
    }
});
exports.deleteRole = deleteRole;
