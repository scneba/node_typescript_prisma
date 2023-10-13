import { Router } from "express";
import { login } from "../controller/authenticating/service";
import { createUser } from "../controller/registering/service";
const router = Router();
router.post("/login/password", login);
router.post("/register", createUser);
export default router;
