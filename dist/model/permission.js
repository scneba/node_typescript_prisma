"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
const mongoose_1 = require("mongoose");
const data_1 = require("../data");
const permissionSchema = new mongoose_1.Schema({
    name: { type: String, maxlength: 50 },
    action: {
        type: String,
        enum: data_1.Actions,
        default: "get"
    },
    resource: { type: String, maxlength: 50 },
    createdAt: { type: Date, default: Date.now }
});
exports.Permission = (0, mongoose_1.model)("Permission", permissionSchema);
