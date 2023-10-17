import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const autthToken = request.headers.authorization;

  if(!autthToken) {
    return response.status(401).json({
      message: "Token is missing"
    })
  }

  // Bearer <token>
  const [, token] = autthToken.split(" ")

  try {
    verify(token, "4bd98fa7-91bd-4b61-9abd-49a3db38bf3d");

    return next()
  } catch (error) {
    return response.status(401).json({
      message: "Token invalid"
    })
  }
}