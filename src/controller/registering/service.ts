import { Request, Response } from "express";
import { writeBadRequest, writeSuccess } from "../../utils/response";
import { validatePermission, validateUser, validateRole } from "./validate";
import { postUser } from "../../data/userMong";
import { postPermission } from "../../data/permission";
import { postRole } from "../../data/role";
import { User } from "../../model/user";
import bcrypt from "bcrypt";

export const createUser = async function (
  req: Request,
  res: Response<User | string>
) {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const password = req.body.password;
  const roles = req.body.roles;

  try {
    const errs = await validateUser(
      firstName,
      lastName,
      phone,
      email,
      gender,
      password,
      roles
    );
    if (errs.length > 0) {
      writeBadRequest(res, errs);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await postUser(
      firstName,
      lastName,
      phone,
      email,
      gender,
      hashedPassword,
      roles
    );
    writeSuccess(res, user);
  } catch (e: any) {
    console.error(e.message);
    res.status(500).send("Ooops");
  }
};

export const createPermission = async function (req: Request, res: Response) {
  try {
    const name = req.body.name;
    const action = req.body.action;
    const resource = req.body.resource;
    const errs = await validatePermission(name, action, resource);
    if (errs.length > 0) {
      writeBadRequest(res, errs);
      return;
    }
    const perms = await postPermission(name, action, resource);
    writeSuccess(res, perms);
  } catch (e: any) {
    console.error(e);
    res.status(500).end();
  }
};

export const createRole = async function (req: Request, res: Response) {
  try {
    const name = req.body.name;
    const perms = req.body.permissions;
    const errs = await validateRole(name, perms);
    if (errs.length > 0) {
      writeBadRequest(res, errs);
      return;
    }
    const role = await postRole(name, perms);
    writeSuccess(res, role);
  } catch (e: any) {
    console.error(e);
    res.status(500).end();
  }
};
