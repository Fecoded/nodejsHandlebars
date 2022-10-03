import express from "express";
import { addStories, addForm, showStories } from "../controllers/stories";
import { ensureAuth } from "../middleware/auth";
const Router = express.Router();

Router.route("/add").get(ensureAuth, addStories);
Router.route("/").post(ensureAuth, addForm).get(ensureAuth, showStories);

export default Router;
