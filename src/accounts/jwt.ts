import * as jwt from "jsonwebtoken";
import { NotAuthorized } from "../Errors";

const HOUR = 36000;
const SECRET = process.env.JWT_SIGNING_SECRET;

const getSecondsNow = (): number => Math.floor(new Date().getTime() / 1000);

/**
 * Issues a new signed JSON Web token.
 * @param sub The subject (token holder's) identifier
 * @param validFor How long should the token stay valid (in seconds)
 */

export const issueToken = (sub: number | string, validFor: number = HOUR) => {
  const iat = getSecondsNow();
  const exp = iat + Math.floor(validFor);
  const payload = {
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
export const validateToken = (token: string) => {
  return jwt.verify(token, SECRET);
};

export const authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ").pop();
    req.user = validateToken(token).sub;
    next();
  } catch (err) {
    throw new NotAuthorized("invalid token");
  }
};
