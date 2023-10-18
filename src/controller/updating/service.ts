import { Request, Response } from "express";
import { validatePasswordUpdate, validateUser } from "./validate";
import { writeBadRequest, writeSuccess } from "../../utils/response";
import { updateDBPassword, updateDBUser } from "../../data/userMong";
import bcrypt from "bcrypt";

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const gender = req.body.gender;
  const roles = req.body.roles;
  try {
    const errs = await validateUser(
      id,
      firstName,
      lastName,
      phone,
      gender,
      roles
    );
    if (errs.length > 0) {
      writeBadRequest(res, errs);
      return;
    }
    const user = await updateDBUser(
      id,
      firstName,
      lastName,
      phone,
      gender,
      roles
    );
    writeSuccess(res, user);
  } catch (ex) {
    console.error(ex);
    res.status(500).end();
  }
};

export const updatePassword = async function (req: Request, res: Response) {
  const id = req.params.id;
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;
  try {
    const errs = await validatePasswordUpdate(id, oldPass, newPass);
    if (errs.length > 0) {
      writeBadRequest(res, errs);
      return;
    }
    const hashedPassword = await bcrypt.hash(newPass, 10);
    await updateDBPassword(id, hashedPassword);
    writeSuccess(res);
  } catch (ex) {
    console.error(ex);
    res.status(500).end();
  }
};
