"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockExpectedResponse = exports.mockResponse = exports.mockRequest = void 0;
const mockRequest = (body, params = {}, query = {}) => {
    const req = { body, params, query };
    return req;
};
exports.mockRequest = mockRequest;
const mockResponse = () => {
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
        end: jest.fn().mockReturnThis()
    };
    return res;
};
exports.mockResponse = mockResponse;
const mockExpectedResponse = (data, errors = []) => ({
    data,
    errors
});
exports.mockExpectedResponse = mockExpectedResponse;
