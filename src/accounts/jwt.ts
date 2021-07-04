import * as jwt from "jsonwebtoken";
import { JwtPayload, Request, Response, Next } from "../types";
import { NotAuthorizedError } from "../Errors";

const HOUR = 3600;
const SECRET = process.env.JWT_SIGNING_SECRET;

const getSecondsNow = (): number => Math.floor(new Date().getTime() / 1000);

/**
 * Issues a new signed JSON Web token.
 * @param sub The subject (token holder's) identifier
 * @param validFor How long should the token stay valid (in seconds)
 */

//prettier-ignore
export const issueToken = (sub: number | string, validFor: number = HOUR): string => {
  const iat = getSecondsNow();
  const exp = iat + Math.floor(validFor);
  const payload: JwtPayload = {
    sub,
    iat,
    exp,
  };
  return jwt.sign(payload, SECRET);
};

/**
 * Validates the given JSON web token.
 * @param token The signed JSON Web token to validate
 * @returns The token payload if the token was valid
 * @throws An error if token was invalid
 */

export const validateToken = (token: string): JwtPayload => {
  return jwt.verify(token, SECRET);
};

export const authenticateToken = (req: Request, res: Response, next: Next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    req.user = validateToken(token).sub;
    next();
  } catch (err) {
    throw new NotAuthorizedError("invalid token");
  }
};
