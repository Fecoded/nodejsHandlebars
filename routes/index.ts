import express from "express";
import { Dashboard, Login } from "../controllers";
import { ensureAuth, ensureGuest } from "../middleware/auth";
const Router = express.Router();

Router.route("/").get(ensureGuest, Login);
Router.route("/dashboard").get(ensureAuth, Dashboard);

export default Router;
