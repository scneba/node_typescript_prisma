"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.commentSchema = exports.Post = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const postSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    title: { type: String },
    post: { type: String },
    createdAt: { type: Date, default: Date.now }
});
exports.Post = mongoose_1.default.model("Post", postSchema);
exports.commentSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Post"
    },
    comment: { type: String, default: "hahaha" },
    createdAt: { type: Date, default: Date.now },
    buff: Buffer
});
exports.Comment = mongoose_1.default.model("Comment", exports.commentSchema);
// a setter
//   Comment.path('name').set(function(v) {
//     return v.toU
//   });
//   // middleware
//   Comment.pre('save', function(next) {
//     notify(this.get('email'));
//     next();
//   });
