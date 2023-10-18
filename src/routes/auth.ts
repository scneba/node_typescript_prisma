import { NextFunction, Request, Response, Router } from "express";
import { login } from "../controller/authenticating/service";
import { createUser } from "../controller/registering/service";
import passport from "passport";
const router = Router();
// router.post("/login/password", login);
router.post("/login/password", login);
router.post("/register", createUser);
router.post("/logout", async (req: Request, res: Response) => {
  if (!req.isAuthenticated()) {
    res.status(200).end();
    return;
  }

  req.logout((err) => {
    if (err) {
      res.send(500).end();
      return;
    }
  });
  req.session.destroy((err) => {
    if (err) {
      res.send(500).end();
      return;
    }
    res.clearCookie("connect.sid");
    res.status(200).end();
  });
});

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

//https://stackoverflow.com/a/54556626
//middleware to trim post requests
export function trimStrings(req: Request, res: Response, next: NextFunction) {
  if (["POST", "PATCH", "PUT"].includes(req.method)) {
    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === "string") {
        req.body[key] = value.trim();
      }
    }
  }
  next();
}

export default router;
