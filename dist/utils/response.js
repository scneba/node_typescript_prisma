"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeBadRequest = exports.writeCreated = exports.writeSuccess = exports.writeResponse = void 0;
const writeResponse = function (res, data, errors, statusCode) {
    try {
        res.status(statusCode);
        res.json({ data, errors });
        res.end();
    }
    catch (e) {
        console.log(e);
    }
};
exports.writeResponse = writeResponse;
const writeSuccess = (res, data = null, errors = []) => {
    (0, exports.writeResponse)(res, data, errors, 200);
};
exports.writeSuccess = writeSuccess;
const writeCreated = (res, data, errors = []) => {
    (0, exports.writeResponse)(res, data, errors, 201);
};
exports.writeCreated = writeCreated;
const writeBadRequest = (res, errors = []) => {
    (0, exports.writeResponse)(res, null, errors, 400);
};
exports.writeBadRequest = writeBadRequest;
