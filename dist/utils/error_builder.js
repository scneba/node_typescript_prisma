"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addError = exports.buildError = void 0;
const buildError = (errCode, errMsg, field = "", data = "") => {
    let errs = [];
    errs.push({ err_code: errCode, msg: errMsg, data, field });
    return errs;
};
exports.buildError = buildError;
const addError = function (errors, errCode, errMsg, field = "", data = "") {
    if (Array.isArray(errors)) {
        errors.push({ err_code: errCode, msg: errMsg, data, field });
        return errors;
    }
    else {
        let errs = [];
        errs.push({ err_code: errCode, msg: errMsg, data, field });
        return errs;
    }
};
exports.addError = addError;
