import { Router } from "express";
import { login } from "../controller/authenticating/service";
const router = Router();
router.post("/login", login);
export default router;
