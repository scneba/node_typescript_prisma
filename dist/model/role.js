"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    name: { type: String, maxlength: 50 },
    permissions: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Permission"
        }
    ],
    createdAt: { type: Date, default: Date.now }
});
exports.Role = (0, mongoose_1.model)("Role", roleSchema);
