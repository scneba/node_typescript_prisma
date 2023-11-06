import { getRole } from "../../data/role";
import { Permission } from "../../model/permission";
import { type Error, addError, buildError } from "../../utils/error_builder";
import * as sharedErrors from "../../utils/shared_errors";
import { getUser } from "../../data/user";
import { getPermission } from "../../data/permission";
import { Actions, Resources, isObjectIdValid } from "../../data";
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
    firstName,
    lastName,
    email,
    phone,
    gender,
    roles
  };
  let errs: Error[] = [];
  if (!email) {
    errs = addError(
      errs,
      sharedErrors.Required,
      "Email  is required",
      "email",
      data
    );
  } else {
    //TODO validate email
    const user = await getUser("", email);
    if (user) {
      errs = addError(
        errs,
        sharedErrors.Exists,
        "Email already exists",
        "email",
        data
      );
    }
  }
  if (!firstName) {
    errs = addError(
      errs,
      sharedErrors.Required,
      "Firstname  is required",
      "first_name",
      data
    );
  }
  if (!phone) {
    errs = addError(
      errs,
      sharedErrors.Required,
      "Phone  is required",
      "phone",
      data
    );
  }
  if (!gender) {
    errs = addError(
      errs,
      sharedErrors.Required,
      "Gender  is required",
      "gender",
      data
    );
  } else {
  }

  if (!password) {
    errs = addError(
      errs,
      sharedErrors.Required,
      "Password is required",
      "password",
      data
    );
  }
  if (!roles || roles.length == 0) {
    errs = addError(
      errs,
      sharedErrors.Required,
      "role is required",
      "role",
      data
    );
  } else {
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

export const validatePermission = async (
  name: string,
  action: Actions,
  resource: Resources
): Promise<Error[]> => {
  let errs: Error[] = [];
  const data = { name, action, resource };
  if (!name) {
    addError(
      errs,
      sharedErrors.Required,
      "Permission name is required",
      "name",
      data
    );
  } else {
    const perm = await Permission.findOne({ name });
    if (perm) {
      addError(
        errs,
        sharedErrors.Exists,
        "Permission name already exist",
        "name",
        data
      );
    }
  }
  if (!action) {
    addError(
      errs,
      sharedErrors.Required,
      "Permission action is required",
      "action",
      data
    );
  } else if (!Actions.includes(action)) {
    addError(
      errs,
      sharedErrors.InvalidAction,
      "Permission action is invalid, get, list, create or update accepted",
      "action",
      data
    );
  }
  if (!resource) {
    addError(
      errs,
      sharedErrors.Required,
      "Permission resource is required",
      "resource",
      data
    );
  } else if (!Resources.includes(resource)) {
    addError(
      errs,
      sharedErrors.InvalidResource,
      `Resource ${resource} is invalid`,
      "resource",
      data
    );
  } else {
    const perm = await Permission.findOne({ action, resource });
    if (perm) {
      addError(
        errs,
        sharedErrors.Exists,
        `Permission with action and resource already exist with name ${perm.name}`,
        "action",
        data
      );
    }
  }
  return errs;
};

export const validateRole = async (
  name: string,
  perms: string[]
): Promise<Error[]> => {
  const data = { name, permissions: perms };
  if (!name) {
    return buildError(
      sharedErrors.Required,
      "Role name is required",
      "name",
      data
    );
  }
  const role = await getRole("", name);
  if (role) {
    return buildError(
      sharedErrors.Required,
      `Role with name ${name} already exists`,
      "name",
      data
    );
  }
  if (!perms || perms.length < 1) {
    return buildError(
      sharedErrors.Required,
      "Permissions are required for role",
      "permissions",
      data
    );
  }
  const errs: Error[] = [];
  for (let permId of perms) {
    if (!isObjectIdValid(permId)) {
      addError(
        errs,
        sharedErrors.InvalidObjectId,
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
        sharedErrors.NotFound,
        `permission with id ${permId} not found`,
        "permissions",
        data
      );
    }
  }
  return errs;
};
