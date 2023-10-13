import { Request, Response } from "express";
import { writeSuccess } from "../../utils/response";
import { getPermission } from "../../data/permission";
import { getRole } from "../../data/role";

export const getPermissions = async (req: Request, res: Response) => {
  const id = req.query.id;
  const name = req.query.name;
  try {
    const perms = await getPermission(id as string, name as string);
    writeSuccess(res, perms);
  } catch (exp) {
    console.log(exp);
    res.status(500).end();
  }
};

export const getRoles = async (req: Request, res: Response) => {
  const id = req.query.id;
  const name = req.query.name;
  try {
    const perms = await getRole(id as string, name as string);
    writeSuccess(res, perms);
  } catch (exp) {
    console.log(exp);
    res.status(500).end();
  }
};
