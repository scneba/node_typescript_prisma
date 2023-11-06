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
exports.authorizeRequest = exports.login = exports.authenticateRequest = exports.strategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_1 = require("../../model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_1 = require("../../utils/response");
const errors_1 = require("./errors");
const user_2 = require("../../data/user");
exports.strategy = new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.User.findOne({ email: username });
        if (!user) {
            return done(null, false, { message: errors_1.IncorrectLogin });
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: errors_1.IncorrectLogin });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
}));
const authenticateRequest = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
        return;
    }
    return res.status(401).send("unauthorized");
};
exports.authenticateRequest = authenticateRequest;
const login = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        passport_1.default.authenticate("local", (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json(info);
            }
            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                // User is now authenticated and logged in
                (0, response_1.writeSuccess)(res, "Logged in successfully", []);
            });
        })(req, res, next);
    });
};
exports.login = login;
const authorizeRequest = function (action, resource) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (req.isAuthenticated()) {
            const user = req.user;
            const email = user.email;
            if (email) {
                const perms = yield (0, user_2.getUserPermissions)(email);
                if (perms) {
                    for (let role of perms.roles) {
                        for (let perm of role.permissions) {
                            if (perm.action === action && perm.resource === resource) {
                                next();
                                return;
                            }
                        }
                    }
                }
            }
        }
        res.status(403).end();
    });
};
exports.authorizeRequest = authorizeRequest;
