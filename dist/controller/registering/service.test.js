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
const interceptors_1 = require("../../utils/interceptors");
jest.mock("../../data/user");
const userData = __importStar(require("../../data/user"));
const service_1 = require("./service");
const error_builder_1 = require("../../utils/error_builder");
const sharedErrors = __importStar(require("../../utils/shared_errors"));
describe("User tests", () => {
    test("should create new user ", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            firstName: "stk",
            lastName: "himself",
            phone: "235959404",
            email: "stk@gmail.com",
            gender: "Male",
            password: "some pass"
        };
        userData.getUser.mockResolvedValue(Promise.resolve(null));
        const res = (0, interceptors_1.mockResponse)();
        const req = (0, interceptors_1.mockRequest)(user, {}, {});
        yield (0, service_1.createUser)(req, res);
        //expected values
        const errs = (0, error_builder_1.buildError)(sharedErrors.Required, "role is required", "role", user);
        delete user.password;
        user["roles"] = undefined;
        //make sure the right status and response are emitted
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledTimes(1);
        const ret = res.json.mock.calls[0][0];
        expect(ret.data).toBe(null);
        expect(ret.errors).toHaveLength(1);
        expect(ret.errors[0].err_code).toBe(sharedErrors.Required);
        expect(ret.errors[0].err_code).toBe(sharedErrors.Required);
        expect(ret.errors[0].field).toBe("role");
    }));
});
