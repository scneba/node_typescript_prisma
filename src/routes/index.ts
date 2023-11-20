import { Router } from "express";
import {
  assignRoles,
  createPermission,
  createPortfolio,
  createRole,
  createUser,
  unassignRoles
} from "../controller/registering/service";
import {
  getCurrentUser,
  getPermissions,
  getPortfolios,
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
router.post("/users/:id/roles", assignRoles);
router.delete("/users/:id/roles", unassignRoles);
router.get("/currentUser", getCurrentUser);

router.post("/permissions", createPermission);
router.get(
  "/permissions",
  authorizeRequest("get", "permissions"),
  getPermissions
);
//router.get("/permissions", getPermissions);
router.delete("/permissions/:id", deletePermission);

router.post("/roles", createRole);
router.get("/roles", getRoles);
router.delete("/roles/:id", deleteRole);
router.put("/roles/:id", putRole);

router.post("/portfolios", createPortfolio);
router.get("/portfolios", getPortfolios);

export default router;
