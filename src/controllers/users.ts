import User from "../models/User";
import { hashPassword, comparePassword } from "../accounts/password";
import { issueToken } from "../accounts/jwt";
import { NotAuthorized, NotFoundError } from "../Errors";

export const createUser = async (req, res) => {
  const { username, name, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const newUser = {
    username,
    name,
    password: hashedPassword.hash,
  };
  await User.query().insert(newUser);
  res.send(201);
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.query().where({ username }).first();
  const match = await comparePassword(password, user.password);
  if (!match) throw new NotAuthorized("Invalid password");
  const token = issueToken(user.id);
  res.send(token);
};

export const getUsers = async (req, res) => {
  const users = await User.query();
  res.send(users);
};

export const deleteUser = async (req, res) => {
  const userId = req.user;
  const result = await User.query().deleteById(userId);
  if (!result) throw new NotFoundError("No such User!");
  res.send("deleted");
};
