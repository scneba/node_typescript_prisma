import { Request, Response } from "express";
import { buildError } from "../../utils/error_builder";
import { InvalidObjectId } from "./errors";
import { deleteDbPermission } from "../../data/permission";
import { writeBadRequest, writeSuccess } from "../../utils/response";
import { deleteDbRole } from "../../data/role";
import { isObjectIdValid } from "../../data";

export const deletePermission = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!isObjectIdValid(id)) {
    const errs = buildError(
      InvalidObjectId,
      `Object id ${id} is invalid`,
      "id",
      { id }
    );
    writeBadRequest(res, errs);
    return;
  }
  try {
    const permId = await deleteDbPermission(id);
    writeSuccess(res, permId, []);
  } catch (e: any) {
    console.error(e);
    res.status(500).end();
  }
};
export const deleteRole = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!isObjectIdValid(id)) {
    const errs = buildError(
      InvalidObjectId,
      `Object id ${id} is invalid`,
      "id",
      { id }
    );
    writeBadRequest(res, errs);
    return;
  }
  try {
    const permId = await deleteDbRole(id);
    writeSuccess(res, permId, []);
  } catch (e: any) {
    console.error(e);
    res.status(500).end();
  }
};
