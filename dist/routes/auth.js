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
exports.trimStrings = void 0;
const express_1 = require("express");
const service_1 = require("../controller/authenticating/service");
const service_2 = require("../controller/registering/service");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
// router.post("/login/password", login);
router.post("/login/password", service_1.login);
router.post("/register", service_2.createUser);
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.isAuthenticated()) {
        res.status(200).end();
        return;
    }
    req.logout((err) => {
        if (err) {
            res.send(500).end();
            return;
        }
    });
    req.session.destroy((err) => {
        if (err) {
            res.send(500).end();
            return;
        }
        res.clearCookie("connect.sid");
        res.status(200).end();
    });
}));
passport_1.default.serializeUser(function (user, done) {
    process.nextTick(function () {
        done(null, { email: user.email });
    });
});
passport_1.default.deserializeUser(function (user, done) {
    process.nextTick(function () {
        return done(null, user);
    });
});
//https://stackoverflow.com/a/54556626
//middleware to trim post requests
function trimStrings(req, res, next) {
    if (["POST", "PATCH", "PUT"].includes(req.method)) {
        for (const [key, value] of Object.entries(req.body)) {
            if (typeof value === "string") {
                req.body[key] = value.trim();
            }
        }
    }
    next();
}
exports.trimStrings = trimStrings;
exports.default = router;
