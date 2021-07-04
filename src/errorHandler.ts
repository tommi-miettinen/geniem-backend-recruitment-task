import { HttpError } from "./Errors";
import { Request, Response, Error, Next } from "./types";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: Next
) => {
  if (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).send({
        message: err.message,
      });
    } else {
      res.status(500).send({
        message: "An unexpected error occurred!",
      });
    }
  } else {
    next();
  }
};
