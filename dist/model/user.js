"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true, maxlength: 50 },
    name: { type: String },
    email: { type: String, unique: true, required: [true, "email is required"] },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female"],
            message: "{VALUE} supplied, should be Male or Female"
        },
        required: [true, "gender is required"]
    },
    password: { type: String, required: [true, "password is required"] },
    roles: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Role"
        }
    ],
    createdAt: { type: Date, default: Date.now }
});
userSchema.pre("save", function (next) {
    this.name = this.firstName + " " + this.lastName;
    next();
});
exports.User = (0, mongoose_1.model)("User", userSchema);
