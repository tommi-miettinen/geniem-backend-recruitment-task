import User from "../models/User";
import { hashPassword, comparePassword } from "../accounts/password";
import { issueToken } from "../accounts/jwt";
import { NotAuthorizedError, NotFoundError } from "../Errors";
import { Request, Response } from "../types";

export const createUser = async (req: Request, res: Response) => {
  const { username, name, password }: User = req.body;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    username,
    name,
    password: hashedPassword.hash,
  };
  const user = await User.query().insert(newUser);
  delete user.password;
  res.status(201).send(user);
};

export const login = async (req: Request, res: Response) => {
  const { username, password }: User = req.body;
  const user = await User.query().where({ username }).first();
  if (!user) throw new NotFoundError("No such User!");
  const match = await comparePassword(password, user.password);
  if (!match) throw new NotAuthorizedError("Invalid password");
  const token = issueToken(user.id);
  res.send(token);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.query();
  if (!users.length) throw new NotFoundError("No Users found!");
  const usersWithoutPassword = users.map(({ password, ...user }) => user);
  res.send(usersWithoutPassword);
};

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.user;
  const deletedCount = await User.query().deleteById(userId);
  if (!deletedCount) throw new NotFoundError("No such User!");
  res.send(deletedCount);
};
