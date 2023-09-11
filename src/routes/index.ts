import { Router } from "express";
import { createUser } from "../controller/registering/service";

const router: Router = Router();

router.get("/", createUser);
export default router;
