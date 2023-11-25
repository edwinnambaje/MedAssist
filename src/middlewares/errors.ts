import { NextFunction, Request, Response } from "express";

export const notFoundHandler = (req: Request, res: Response) => {
  return res.status(404).send({
    status: "error",
    message: "endpoint not found",
  });
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  console.log(`res.headersSent: ${res.headersSent}`);
  // console.log(err.name);
  if (res.headersSent) {
    return next(err);
  }
  switch (err.name) {
    case "BadRequestError":
      return res.status(400).send({
        status: "error",
        message: err.message,
      });
    case "NotFoundError":
      return res.status(404).send({
        status: "error",
        message: err.message,
      });
    case "ValidationError":
      return res.status(422).send({
        status: "error",
        message: err.message,
      });
    case "AuthenticationError":
      return res.status(401).send({
        status: "error",
        message: err.message,
      });
    case "AuthorizationError":
      return res.status(403).send({
        status: "error",
        message: err.message,
      });
    case "ConflictError":
      return res.status(409).send({
        status: "error",
        message: err.message,
      });
    default:
      console.log(err);
      return res.status(500).send({
        status: "error",
        message: "an error occurred",
        ...(!err.message ? {} : { error: err.message || err.toString() }),
      });
  }
};
