import { Request, Response } from "express";
import Story from "../models/Story";
import User from "../models/User";

//@desc     Show add Page
//@route    GET /stories/add
export const addStories = (req: Request, res: Response) => {
  res.render("stories/upsert", {
    add: true,
  });
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

//@desc     Show edit Page
//@route    GET /stories/edit/:id
export const editStory = async (req: Request | any, res: Response) => {
  const story = await Story.findOne({
    _id: req.params.id,
  }).lean();

  if (!story) {
    return res.render("error/404");
  }

  if (story.user != req.user.id) {
    res.redirect("/stories");
  } else {
    res.render("stories/upsert", {
      story,
      add: false,
    });
  }
};

//@desc     Process edit Page
//@route    POST /stories/:id
export const editForm = async (req: Request | any, res: Response) => {
  try {
    let story = await Story.findById(req.params.id).lean();
    if (!story) {
      return res.render("error/404");
    }
    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};

//@desc     Process delete Story
//@route    POST /stories/delete/:id
export const deleteStory = async (req: Request | any, res: Response) => {
  try {
    let story = await Story.findById(req.params.id).lean();

    if (!story) {
      return res.render("error/404");
    }

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      await Story.findOneAndRemove({ _id: req.params.id });
      const stories = await Story.find({ user: req.user.id }).lean();
      res.render("dashboard", { stories, message: "Story was deleted" });
      // res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};
