import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../../model/user";
import { Request, Response, NextFunction } from "express";

export const strategy = new Strategy(
  async (username: string, password: string, done: any) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }
      if (user.password === password) {
        return done(null, false, { message: "Invalid Password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

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
