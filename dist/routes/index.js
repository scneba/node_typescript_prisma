"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_1 = require("../controller/registering/service");
const service_2 = require("../controller/listing/service");
const service_3 = require("../controller/deleting/service");
const service_4 = require("../controller/replacing/service");
const service_5 = require("../controller/updating/service");
const router = (0, express_1.Router)();
router.post("/users", service_1.createUser);
router.patch("/users/:id", service_5.updateUser);
router.patch("/users/:id/password", service_5.updatePassword);
router.get("/users", service_2.getUsers);
router.get("/currentUser", service_2.getCurrentUser);
-router.post("/permissions", service_1.createPermission);
// router.get(
//   "/permissions",
//   authorizeRequest("get", "permissions"),
//   getPermissions
// );
router.get("/permissions", service_2.getPermissions);
router.delete("/permissions/:id", service_3.deletePermission);
router.post("/roles", service_1.createRole);
router.get("/roles", service_2.getRoles);
router.delete("/roles/:id", service_3.deleteRole);
router.put("/roles/:id", service_4.putRole);
exports.default = router;
