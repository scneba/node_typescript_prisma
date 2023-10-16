import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../../model/user";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { writeSuccess } from "../../utils/response";
import { IncorrectLogin } from "./errors";

export const strategy = new Strategy(
  async (username: string, password: string, done: any) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: IncorrectLogin });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: IncorrectLogin });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

export const authenticateRequest = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  return res.status(401).send("unauthorized");
};

export const login = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "local",
    (err: Error | null, user: any, info: Record<string, any>) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json(info);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // User is now authenticated and logged in
        writeSuccess(res, "Logged in successfully", []);
      });
    }
  )(req, res, next);
};
