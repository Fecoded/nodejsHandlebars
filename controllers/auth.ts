import { Request, Response, NextFunction } from "express";
import passport from "passport";

//@desc     Auth with Google
//@route    GET /
export const googleAuth = passport.authenticate("google", {
  scope: ["profile"],
});

//@desc     Google auth callback
//@route    GET /auth/google/callback
export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/",
});

//@desc     Handle Google redirect
//@route    GET /auth/google/callback
export const handleGoogleRedirect = (req: Request, res: Response) =>
  res.redirect("/dashboard");

//@desc     Logout user
//@route    GET /auth/logout
export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
