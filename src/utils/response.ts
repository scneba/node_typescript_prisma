import { Response } from "express";
import { type Error } from "./error_builder";
export const writeResponse = function (
  res: Response,
  data: Record<string, any> | Record<string, any>[] | string | null,
  errors: Error[],
  statusCode: number
) {
  try {
    res.status(statusCode);
    res.json({ data, errors });
    res.end();
  } catch (e) {
    console.log(e);
  }
};

export const writeSuccess = (
  res: Response,
  data: Record<string, any> | Record<string, any>[] | string | null = null,
  errors: Error[] = []
) => {
  writeResponse(res, data, errors, 200);
};

export const writeCreated = (
  res: Response,
  data: Record<string, any> | Record<string, any>[] | string | null,
  errors: Error[] = []
) => {
  writeResponse(res, data, errors, 201);
};

export const writeBadRequest = (res: Response, errors: Error[] = []) => {
  writeResponse(res, null, errors, 400);
};
