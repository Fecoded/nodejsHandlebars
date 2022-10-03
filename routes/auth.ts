import express from "express";
import {
  googleAuth,
  googleCallback,
  handleGoogleRedirect,
  logoutUser,
} from "../controllers/auth";
import { ensureAuth, ensureGuest } from "../middleware/auth";

const Router = express.Router();

Router.route("/google").get(googleAuth);
Router.route("/google/callback").get(googleCallback, handleGoogleRedirect);
Router.route("/logout").get(logoutUser);

export default Router;
