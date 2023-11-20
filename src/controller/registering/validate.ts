import { getRole } from "../../data/role";
import { type Error, addError } from "../../utils/error_builder";
import * as sharedErrors from "../../utils/shared_errors";
import { getUser } from "../../data/user";
import { getPermission } from "../../data/permission";
import { Actions, Resources, isObjectIdValid } from "../../data";
import { getPortfolio } from "../../data/portfolio";
import { getPermissions } from "../listing/service";
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
  } else {
    //TODO check for duplicates
  }
  //TODO validate phone number
  if (!gender) {
    errs = addError(
      errs,
      sharedErrors.Required,
      "Gender  is required",
      "gender",
      data
    );
  } else {
    if (!["Male", "Female"].includes(gender)) {
      errs = addError(
        errs,
        sharedErrors.Required,
        "Invalid gender, should be M or F",
        "gender",
        data
      );
    }
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

  return errs;
};
export const validateRoleAssignment = async function (
  userId: string,
  portfolioId: string,
  roleIds: string[]
): Promise<Error[]> {
  let errs: Error[] = [];
  const data = { user_id: userId, portfolio: portfolioId, roles: roleIds };
  if (!userId) {
    addError(
      errs,
      sharedErrors.Required,
      "User ID  is required",
      "user_id",
      data
    );
  } else {
    const user = await getUser(userId);
    if (!user) {
      addError(
        errs,
        sharedErrors.Exists,
        "User does not exist",
        "user_id",
        data
      );
    }
  }

  if (!portfolioId) {
    addError(
      errs,
      sharedErrors.Required,
      "Portfolio ID  is required",
      "portfolio",
      data
    );
  } else {
    //TODO validate portfolio
  }

  if (!roleIds || roleIds.length < 1) {
    addError(errs, sharedErrors.Required, "Roles are required", "roles", data);
  } else {
    for (let roleId of roleIds) {
      const role = await getRole(roleId);
      if (!role) {
        addError(
          errs,
          sharedErrors.NotFound,
          "Role with ID " + roleId + " not found",
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
    const perm = await getPermission({ name });
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
    const perm = await getPermission({ action, resource });
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
  const errs: Error[] = [];
  if (!name) {
    addError(
      errs,
      sharedErrors.Required,
      "Role name is required",
      "name",
      data
    );
  } else {
    const role = await getRole("", name);
    if (role) {
      return addError(
        errs,
        sharedErrors.Required,
        `Role with name ${name} already exists`,
        "name",
        data
      );
    }
  }
  if (!perms || perms.length < 1) {
    return addError(
      errs,
      sharedErrors.Required,
      "Permissions are required for role",
      "permissions",
      data
    );
  } else {
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
      const perm = await getPermission({ id: permId });
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
  }
  return errs;
};

export const validatePortofolio = async function (name: string) {
  const errs: Error[] = [];
  if (!name) {
    addError(errs, sharedErrors.Required, "Porfolio name is required", "name", {
      name
    });
  } else {
    const perm = await getPortfolio("", name);
    if (perm) {
      addError(
        errs,
        sharedErrors.Exists,
        "Porfolio name already exists",
        "name",
        {
          name
        }
      );
    }
  }
  return errs;
};
