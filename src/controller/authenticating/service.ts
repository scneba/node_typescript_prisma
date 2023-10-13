import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../../model/user";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export const strategy = new Strategy(
  async (username: string, password: string, done: any) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Invalid Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);
export const serializeUser = function () {
  passport.serializeUser<User>(function (user: any, done: any) {
    process.nextTick(function () {
      return done(null, {
        id: user.email
      });
    });
  });

  passport.deserializeUser(function (user: User, done: any) {
    process.nextTick(function () {
      return done(null, user);
    });
  });
};

export const login = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "local",
    (err: Error | null, user: User | false, info: Record<string, any>) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json(info);
      }

      return res.status(200).json({ message: "Logged in successfully" });
    }
  )(req, res, next);
};
