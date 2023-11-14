import { validate } from "uuid";

export const isObjectIdValid = (id: string) => {
  if (validate(id)) {
    return true;
  }
  return false;
};
export const Resources = ["permissions", "roles", "users"] as const;
export const Actions = ["get", "list", "create", "update"] as const;
export const Genders = ["Male", "Female"] as const;
export type Resources = (typeof Resources)[number];
export type Actions = (typeof Actions)[number];
export type Genders = (typeof Genders)[number];
