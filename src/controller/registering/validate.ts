import { isValidObjectId } from "mongoose";
import { getRole } from "../../data/role";
import type { Permission } from "../../model/permission";
import { type Error, addError, buildError } from "../../utils/errors";
import * as errors from "./errors";
import { getUser } from "../../data/userMong";
import type { User } from "../../model/user";
import { getPermission } from "../../data/permission";
export const validateUser = async (
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  gender: "Male" | "Female",
  password: string,
  roles: string[]
): Promise<Error[]> => {
  const data = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    gender,
    roles
  };
  let errs: Error[] = [];
  if (!email) {
    errs = addError(errs, errors.Required, "Email  is required", "email", data);
  } else {
    //TODO validate email
    const user = await getUser("", email);
    if (user) {
      errs = addError(
        errs,
        errors.Exists,
        "Email already exists",
        "email",
        data
      );
    }
  }
  if (!firstName) {
    errs = addError(
      errs,
      errors.Required,
      "Firstname  is required",
      "first_name",
      data
    );
  }
  if (!phone) {
    errs = addError(errs, errors.Required, "Phone  is required", "phone", data);
  }
  if (!gender) {
    errs = addError(
      errs,
      errors.Required,
      "Gender  is required",
      "gender",
      data
    );
  } else {
  }

  if (!password) {
    errs = addError(
      errs,
      errors.Required,
      "Password is required",
      "password",
      data
    );
  }
  if (!roles || roles.length == 0) {
    errs = addError(errs, errors.Required, "role is required", "role", data);
  } else {
    for (let roleId of roles) {
      if (!isValidObjectId(roleId)) {
        addError(
          errs,
          errors.InvalidObjectId,
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
          errors.NotFound,
          `role with id ${roleId} does not exist`,
          "roles",
          data
        );
      }
    }
  }
  return errs;
};

export const validatePermission = async (name: string): Promise<Error[]> => {
  if (!name) {
    return buildError(errors.Required, "Permission name is required", "name", {
      name
    });
  }
  return [];
};

export const validateRole = async (
  name: string,
  perms: string[]
): Promise<Error[]> => {
  const data = { name, permissions: perms };
  if (!name) {
    return buildError(errors.Required, "Role name is required", "name", data);
  }
  const role = await getRole("", name);
  if (role) {
    return buildError(
      errors.Required,
      `Role with name ${name} already exists`,
      "name",
      data
    );
  }
  if (!perms || perms.length < 1) {
    return buildError(
      errors.Required,
      "Permissions are required for role",
      "permissions",
      data
    );
  }
  const errs: Error[] = [];
  for (let permId of perms) {
    if (!isValidObjectId(permId)) {
      addError(
        errs,
        errors.InvalidObjectId,
        `permission with id ${permId} is invalid`,
        "permissions",
        data
      );
      continue;
    }
    const perm = await getPermission(permId);
    if (!perm) {
      addError(
        errs,
        errors.NotFound,
        `permission with id ${permId} not found`,
        "permissions",
        data
      );
    }
  }
  return errs;
};
