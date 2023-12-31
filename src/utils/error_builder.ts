import * as regErrors from "../controller/registering/errors";
import * as authErrors from "../controller/authenticating/errors";
import * as updateErrors from "../controller/updating/errors";
import * as sharedErrors from "./shared_errors";

type regErrorConst = (typeof regErrors)[keyof typeof regErrors];
type authErrorConst = (typeof authErrors)[keyof typeof authErrors];
type updateErrorConst = (typeof updateErrors)[keyof typeof updateErrors];
type sharedErrorConst = (typeof sharedErrors)[keyof typeof sharedErrors];
type ErrorCode =
  | regErrorConst
  | authErrorConst
  | sharedErrorConst
  | updateErrorConst;

export interface Error {
  err_code: ErrorCode;
  field?: string;
  msg: string;
  data: Record<string, any> | string;
}
export const buildError = (
  errCode: ErrorCode,
  errMsg: string,
  field: string = "",
  data: Record<string, any> | string = ""
): Error[] => {
  let errs: Error[] = [];
  errs.push({ err_code: errCode, msg: errMsg, data, field });
  return errs;
};

export const addError = function (
  errors: Error[] | Error,
  errCode: ErrorCode,
  errMsg: string,
  field: string = "",
  data: Record<string, any> | string = ""
) {
  if (Array.isArray(errors)) {
    errors.push({ err_code: errCode, msg: errMsg, data, field });
    return errors;
  } else {
    let errs: Error[] = [];
    errs.push({ err_code: errCode, msg: errMsg, data, field });
    return errs;
  }
};
