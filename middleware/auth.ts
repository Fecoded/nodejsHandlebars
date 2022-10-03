import { Request, Response, NextFunction } from "express";

export function ensureAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}

export function ensureGuest(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    return next();
  }
}
