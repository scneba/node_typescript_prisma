"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genders = exports.Actions = exports.Resources = exports.isObjectIdValid = void 0;
const mongoose_1 = require("mongoose");
const isObjectIdValid = (id) => {
    if ((0, mongoose_1.isValidObjectId)(id)) {
        return true;
    }
    return false;
};
exports.isObjectIdValid = isObjectIdValid;
exports.Resources = ["permissions", "roles", "users"];
exports.Actions = ["get", "list", "create", "update"];
exports.Genders = ["Male", "Female"];
