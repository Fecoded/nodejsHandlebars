import { Request, Response } from "express";
import Story from "../models/Story";

type IUser = {
  _id: string;
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image: string;
  createdAt: Date;
};

interface IRequest<T extends IUser> {
  user: T;
}

//@desc     Login/Landing Page
//@route    GET /
export const Login = (req: Request, res: Response) => {
  res.render("login", { layout: "login" });
};

//@desc     Dashboard
//@route    GET /dashboard
export const Dashboard = async (
  req: Request | IRequest<any>,
  res: Response
) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();

    res.render("dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
};
