import passport, { use } from "passport";
import { Strategy } from "passport-local";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { writeSuccess } from "../../utils/response";
import { IncorrectLogin } from "./errors";
import { Actions, Resources } from "../../data";
import { getUser, getUserPermissions } from "../../data/user";

export const strategy = new Strategy(
  async (username: string, password: string, done: any) => {
    try {
      const user = await getUser("", username, true);
      if (!user) {
        return done(null, false, { message: IncorrectLogin });
      }
      const match = await bcrypt.compare(password, user.password!);
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

export const authorizeRequest = function (
  action: Actions,
  resource: Resources
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      const email = user.email;
      if (email) {
        const perms = await getUserPermissions(email);
        for (let perm of perms) {
          if (perm.action === action && perm.resource === resource) {
            next();
            return;
          }
        }
      }
    }
    res.status(403).end();
  };
};
