import { Request, Response } from "express";
import { validateRoleForReplacement } from "./validate";
import { writeBadRequest, writeSuccess } from "../../utils/response";
import { replaceRole } from "../../data/role";

export const putRole = async (req: Request, res: Response) => {
  const id = req.params.id;
  const name = req.body.name;
  const perms = req.body.permissions;

  try {
    const errs = await validateRoleForReplacement(id, name, perms);
    if (errs.length > 0) {
      writeBadRequest(res, errs);
      return;
    }
    const data = await replaceRole(id, name, perms);
    writeSuccess(res, data, []);
  } catch (e: any) {
    console.error(e);
    res.status(500).end();
  }
};

//TODO put permission
