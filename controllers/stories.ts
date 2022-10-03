import { Request, Response } from "express";
import Story from "../models/Story";
import User from "../models/User";

//@desc     Show add Page
//@route    GET /stories/add
export const addStories = (req: Request, res: Response) => {
  res.render("stories/add");
};

//@desc     Process add Page
//@route    POST /stories
export const addForm = async (req: Request, res: Response) => {
  try {
    req.body.user = req.user;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};

//@desc     Show all stories
//@route    GET /stories
export const showStories = async (req: Request, res: Response) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate({ path: "user", model: User })
      .sort({ createdAt: "desc" })
      .lean();

    res.render("stories", {
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};
