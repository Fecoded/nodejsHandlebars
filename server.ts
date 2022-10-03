import express, { Express } from "express";
import * as path from "path";
import "dotenv/config";
import morgan from "morgan";
import { engine } from "express-handlebars";
import passport from "passport";
import session from "express-session";
import connectDB from "./config/db";
import MongoStore from "connect-mongo";
import { formatDate, truncate, stripTags, editIcon } from "./helpers/hbs";
import authRoute from "./routes";
import auth from "./routes/auth";
import stories from "./routes/stories";

const app: Express = express();

import passportAuth from "./config/passport";
passportAuth(passport);

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine(
  ".hbs",
  engine({
    helpers: { formatDate, truncate, stripTags, editIcon },
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: "views/layout",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Sessions
app.use(
  session({
    secret: process.env.PASSPORT_SECRET ?? "",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions: {},
      ttl: 60 * 60,
    }),
  })
);
//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set Global Var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

//ROUTES
app.use("/", authRoute);
app.use("/auth", auth);
app.use("/stories", stories);

const PORT: number | string = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
