import express, { Application, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
var MongoDBStore = require("connect-mongodb-session")(session);

import baseRoutes from "./routes/index";
import authRoutes, { trimStrings } from "./routes/auth";
import { connect } from "./connectmong";
import {
  authenticateRequest,
  strategy
} from "./controller/authenticating/service";

//For env File
dotenv.config();
const env = process.env.NODE_ENV || "development";
//connect mongodb
connect();
const app: Application = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //use querystring
app.use(cookieParser());
app.use(trimStrings);

// use a secure file store for production and staging, and temporary one for development

var store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "sessions"
});
// Catch errors
store.on("error", function (error: any) {
  console.log(error);
});

if (env == "development") {
  app.use(
    session({
      store,
      secret: process.env.COOKIE_SECRET || "dev",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true
      } // 30 days
      // Insert express-session options here
    })
  );
} else {
  app.use(
    session({
      store,
      secret: process.env.COOKIE_SECRET || "dev",
      resave: false,
      saveUninitialized: false, //for login sessions only
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: false,
        httpOnly: true
      }
      // Insert express-session options here
    })
  );
}
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);
app.use("/auth", authRoutes);
app.use("/", authenticateRequest, baseRoutes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).end();
});

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});
app.listen(port, () => {
  console.log(`Server is Fired at http://localhost:${port}`);
});
