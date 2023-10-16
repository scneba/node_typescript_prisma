import { Router } from "express";
import { login } from "../controller/authenticating/service";
import { createUser } from "../controller/registering/service";
import passport from "passport";
const router = Router();
// router.post("/login/password", login);
router.post("/login/password", login);
router.post("/register", createUser);
passport.serializeUser(function (user: any, done) {
  process.nextTick(function () {
    done(null, { email: user.email });
  });
});

passport.deserializeUser(function (user: any, done: any) {
  process.nextTick(function () {
    return done(null, user);
  });
});

export default router;
