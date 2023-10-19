import { Request, Response } from "express";
import { writeSuccess } from "../../utils/response";
import { getPermission, findPermissions } from "../../data/permission";
import { findRole, getRole } from "../../data/role";
import { findUsers, getUser } from "../../data/user";

export const getPermissions = async (req: Request, res: Response) => {
  const id = req.query.id;
  const name = req.query.name;
  try {
    if (id || name) {
      const perms = await getPermission(id as string, name as string);
      writeSuccess(res, perms);
    } else {
      const perms = await findPermissions();
      writeSuccess(res, perms);
    }
  } catch (exp) {
    console.log(exp);
    res.status(500).end();
  }
};

export const getRoles = async (req: Request, res: Response) => {
  const id = req.query.id;
  const name = req.query.name;
  try {
    if (id || name) {
      const role = await getRole(id as string, name as string);
      writeSuccess(res, role);
    } else {
      const roles = await findRole();
      writeSuccess(res, roles);
    }
  } catch (exp) {
    console.log(exp);
    res.status(500).end();
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const id = req.query.id;
  const email = req.query.email;
  try {
    if (id || email) {
      const user = await getUser(id as string, email as string);
      writeSuccess(res, user);
    } else {
      const users = await findUsers();
      writeSuccess(res, users);
    }
  } catch (exp) {
    console.log(exp);
    res.status(500).end();
  }
};
export const getCurrentUser = async (req: Request, res: Response) => {
  const email = (req.user as any).email;
  if (email) {
    try {
      const user = await getUser("", email as string);
      writeSuccess(res, user);
    } catch (exp) {
      console.log(exp);
      res.status(500).end();
    }
  }
};
