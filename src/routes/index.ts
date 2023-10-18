import { Router } from "express";
import {
  createPermission,
  createRole,
  createUser
} from "../controller/registering/service";
import {
  getCurrentUser,
  getPermissions,
  getRoles,
  getUsers
} from "../controller/listing/service";
import { deletePermission, deleteRole } from "../controller/deleting/service";
import { putRole } from "../controller/replacing/service";
import { updatePassword, updateUser } from "../controller/updating/service";
import { authorizeRequest } from "../controller/authenticating/service";

const router: Router = Router();

router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.patch("/users/:id/password", updatePassword);
router.get("/users", getUsers);
router.get("/currentUser", getCurrentUser);

-router.post("/permissions", createPermission);
// router.get(
//   "/permissions",
//   authorizeRequest("get", "permissions"),
//   getPermissions
// );
router.get("/permissions", getPermissions);
router.delete("/permissions/:id", deletePermission);

router.post("/roles", createRole);
router.get("/roles", getRoles);
router.delete("/roles/:id", deleteRole);
router.put("/roles/:id", putRole);
export default router;
