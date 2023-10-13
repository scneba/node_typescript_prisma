import { Router } from "express";
import {
  createPermission,
  createRole,
  createUser
} from "../controller/registering/service";
import { getPermissions, getRoles } from "../controller/listing/service";

const router: Router = Router();

router.get("/", createUser);
router.post("/users", createUser);
router.post("/permissions", createPermission);
router.get("/permissions", getPermissions);
router.post("/roles", createRole);
router.get("/roles", getRoles);
export default router;
