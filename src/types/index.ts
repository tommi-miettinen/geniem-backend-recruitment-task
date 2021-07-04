import * as express from "express";

export interface JwtPayload {
  sub: number | string;
  iat: number;
  exp: number;
}

export interface Request extends express.Request {
  user?: number | string;
}

export interface Response extends express.Response {}
export interface Error extends express.Errback {}
export interface Next extends express.NextFunction {}
