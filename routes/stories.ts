import express from "express";
import {
  addStories,
  addForm,
  showStories,
  editStory,
  editForm,
  deleteStory,
} from "../controllers/stories";
import { ensureAuth } from "../middleware/auth";
const Router = express.Router();

Router.route("/upsert").get(ensureAuth, addStories);
Router.route("/").post(ensureAuth, addForm).get(ensureAuth, showStories);
Router.route("/:id").get(ensureAuth, editStory);
Router.route("/upsert/:id").post(ensureAuth, editForm);
Router.route("/delete/:id").post(ensureAuth, deleteStory);

export default Router;
