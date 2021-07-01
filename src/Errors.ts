export abstract class HttpError extends Error {
  statusCode = 500;
  constructor(public message: string, statusCode) {
    super();
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends HttpError {
  constructor(message) {
    super(message, 404);
  }
}
export class BadRequestError extends HttpError {
  constructor(message) {
    super(message, 400);
  }
}
export class NotAuthorized extends HttpError {
  constructor(message) {
    super(message, 401);
  }
}
