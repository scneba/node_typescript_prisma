import { getRole } from "../../data/role";
import { type Error, addError, buildError } from "../../utils/error_builder";
import * as sharedError from "../../utils/shared_errors";
import { getPermission } from "../../data/permission";
import { isObjectIdValid } from "../../data";
export const validateRoleForReplacement = async (
  id: string,
  name: string,
  perms: string[]
): Promise<Error[]> => {
  const data = { name, permissions: perms };
  if (!id) {
    return buildError(sharedError.Required, "Role id is required", "id", data);
  }
  if (!isObjectIdValid(id)) {
    return buildError(
      sharedError.InvalidObjectId,
      "Invalid object id",
      "id",
      data
    );
  }
  const errs: Error[] = [];
  const role = await getRole(id);
  if (!role) {
    addError(errs, sharedError.NotFound, "Role with id not found", "id", data);
  }

  if (!name) {
    addError(errs, sharedError.Required, `Role name is required`, "name", data);
  }
  const r = await getRole("", name);
  if (r && r._id != id) {
    addError(
      errs,
      sharedError.Exists,
      `Role with name ${name} already exists`,
      "name",
      data
    );
  }
  if (!perms || perms.length < 1) {
    return buildError(
      sharedError.Required,
      "Permissions are required for role",
      "permissions",
      data
    );
  }
  for (let permId of perms) {
    if (!isObjectIdValid(permId)) {
      addError(
        errs,
        sharedError.InvalidObjectId,
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
        sharedError.NotFound,
        `permission with id ${permId} not found`,
        "permissions",
        data
      );
    }
  }
  return errs;
};
