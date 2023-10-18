import { isObjectIdValid } from "../../data";
import { getRole } from "../../data/role";
import { getUser } from "../../data/userMong";
import { User } from "../../model/user";
import { addError, Error } from "../../utils/error_builder";
import * as sharedErrors from "../../utils/shared_errors";
import bcrypt from "bcrypt";
import { InvalidPassword } from "./errors";

export const validateUser = async (
  id: string,
  firstName: string,
  lastName: string,
  phone: string,
  gender: "Male" | "Female",
  roles: string[]
): Promise<Error[]> => {
  const data = {
    id,
    first_name: firstName,
    last_name: lastName,
    phone,
    gender,
    roles
  };
  let errs: Error[] = [];
  if (!isObjectIdValid(id)) {
    addError(
      errs,
      sharedErrors.InvalidObjectId,
      `Object id ${id} is invalid`,
      "id",
      data
    );
  } else {
    const user = await getUser(id);
    if (!user) {
      addError(
        errs,
        sharedErrors.NotFound,
        `user with id ${id} not found`,
        "id",
        data
      );
    }
  }
  if (phone) {
    //TODO validate phone number
  }
  if (gender && !gender.includes(gender)) {
    errs = addError(
      errs,
      sharedErrors.InvalidGender,
      "Gender  is invalid, shoulde be Male or Female",
      "gender",
      data
    );
  }

  if (roles && roles.length > 0) {
    for (let roleId of roles) {
      if (!isObjectIdValid(roleId)) {
        addError(
          errs,
          sharedErrors.InvalidObjectId,
          `role with id ${roleId} is invalid`,
          "roles",
          data
        );
        continue;
      }
      const role = await getRole(roleId);
      if (!role) {
        addError(
          errs,
          sharedErrors.NotFound,
          `role with id ${roleId} does not exist`,
          "roles",
          data
        );
      }
    }
  }
  return errs;
};

export const validatePasswordUpdate = async (
  id: string,
  oldPass: string,
  newPass: string
): Promise<Error[]> => {
  const errs: Error[] = [];
  if (!isObjectIdValid(id)) {
    addError(
      errs,
      sharedErrors.InvalidObjectId,
      `Object id ${id} is invalid`,
      "id",
      { id }
    );
  } else {
    const user = await getUser(id);
    if (!user) {
      addError(
        errs,
        sharedErrors.NotFound,
        `user with id ${id} not found`,
        "id",
        { id }
      );
    } else {
      const match = await bcrypt.compare(oldPass, user.password);
      if (!match) {
        addError(errs, InvalidPassword, "Invalid password", "oldPassword");
      }
    }
    if (!newPass) {
      addError(
        errs,
        sharedErrors.Required,
        "New password required",
        "newPassword"
      );
    }
    return errs;
  }

  return errs;
};
