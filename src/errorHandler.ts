import { HttpError } from "./Errors";

export const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof HttpError) {
      res.send({
        status: err.statusCode,
        message: err.message,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: "An unexpected error occurred!",
      });
    }
  } else {
    next();
  }
};
