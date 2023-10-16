import { Types } from "mongoose";

export const isValidObjectId = (id: string) => {
  if (Types.ObjectId.isValid(id)) {
    return true;
  }
  return false;
};
export const resources = ["permissions", "roles", "users"];
export const actions = ["get", "list", "create", "update"];
