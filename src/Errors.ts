export abstract class HttpError extends Error {
  statusCode = 500;
  constructor(public message: string) {
    super();
  }
}

export class NotFoundError extends HttpError {
  statusCode = 404;
}
export class BadRequestError extends HttpError {
  statusCode = 400;
}
export class NotAuthorizedError extends HttpError {
  statusCode = 401;
}
