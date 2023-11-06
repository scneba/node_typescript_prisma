"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      }
    : function (o, v) {
        o["default"] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
var MongoDBStore = require("connect-mongodb-session")(
  express_session_1.default
);
const index_1 = __importDefault(require("./routes/index"));
const auth_1 = __importStar(require("./routes/auth"));
const connectmong_1 = require("./connectmong");
const service_1 = require("./controller/authenticating/service");
//For env File
dotenv_1.default.config();
const env = process.env.NODE_ENV || "development";
//connect mongodb
(0, connectmong_1.connect)();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false })); //use querystring
app.use((0, cookie_parser_1.default)());
app.use(auth_1.trimStrings);
// use a secure file store for production and staging, and temporary one for development
var store = new MongoDBStore({
  uri: "mongodb://host.docker.internal:27017/hail",
  collection: "sessions"
});
// Catch errors
store.on("error", function (error) {
  console.log(error);
});
if (env == "development") {
  app.use(
    (0, express_session_1.default)({
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
    (0, express_session_1.default)({
      store,
      secret: process.env.COOKIE_SECRET || "dev",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: true
      }
      // Insert express-session options here
    })
  );
}
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(service_1.strategy);
app.use("/auth", auth_1.default);
app.use("/", service_1.authenticateRequest, index_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).end();
});
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
});
app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
