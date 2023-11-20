import { Request, Response } from "express";
import { writeBadRequest, writeSuccess } from "../../utils/response";
import {
  validatePermission,
  validateUser,
  validateRole,
  validateRoleAssignment,
  validatePortofolio
} from "./validate";
import { postUser } from "../../data/user";
import {
  assignRole as assignDBRole,
  unassignDBRole
} from "../../data/userrole";
import { postPermission } from "../../data/permission";
import { postRole } from "../../data/role";
import bcrypt from "bcrypt";
import { postPortfolio } from "../../data/portfolio";

export const createUser = async function (req: Request, res: Response) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
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
    res.status(500).end();
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

export const assignRoles = async function (req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const portfolioId = req.body.portfolio;
    const user = (req.user as any).email;
    const roleIds = req.body.roles;
    const errs = await validateRoleAssignment(userId, portfolioId, roleIds);
    if (errs.length > 0) {
      writeBadRequest(res, errs);
      return;
    }
    await assignDBRole(userId, portfolioId, user as string, roleIds);
    writeSuccess(res, userId);
  } catch (e: any) {
    console.error(e);
    res.status(500).end();
  }
};

export const unassignRoles = async function (req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const portfolioId = req.body.portfolio;
    const user = (req.user as any).email;
    const roleIds = req.body.roles;
    const errs = await validateRoleAssignment(userId, portfolioId, roleIds);
    if (errs.length > 0) {
      writeBadRequest(res, errs);
      return;
    }
    const count = await unassignDBRole(userId, portfolioId, roleIds);
    writeSuccess(res, { count });
  } catch (e: any) {
    console.error(e);
    res.status(500).end();
  }
};

export const createPortfolio = async function (req: Request, res: Response) {
  try {
    const name = req.body.name;
    const errs = await validatePortofolio(name);
    if (errs.length > 0) {
      writeBadRequest(res, errs);
      return;
    }
    const pf = await postPortfolio(name);
    writeSuccess(res, pf);
  } catch (e: any) {
    console.error(e);
    res.status(500).end();
  }
};
