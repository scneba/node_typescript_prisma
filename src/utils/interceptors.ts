// import { Response } from "jest-express/lib/response";
// import { Request } from "jest-express/lib/request";
import { Request, Response } from "express";
import { type Error } from "./error_builder";

export const mockRequest = (
  body: Record<string, any>,
  params: Record<string, any> = {},
  query: Record<string, any> = {}
) => {
  const req: Partial<Request> = { body, params, query };
  return req as Request;
};

export const mockResponse = () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis()
  };
  return res as Response;
};
export const mockExpectedResponse = (
  data: Record<string, any> | string | null,
  errors: Error[] = []
) => ({
  data,
  errors
});
