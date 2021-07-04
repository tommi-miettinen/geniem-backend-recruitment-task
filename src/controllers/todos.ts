import Todo from "../models/Todo";
import { NotFoundError } from "../Errors";
import { Request, Response } from "../types";

export const getTodos = async (req: Request, res: Response) => {
  const userId = +req.user;
  const todos = await Todo.query().where({ userId });
  if (!todos.length) throw new NotFoundError("No todos!");
  res.send(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const userId = +req.user;
  const todo = await Todo.query().insert({
    title,
    description,
    userId,
  });
  res.send(todo);
};

export const getTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user;
  const todo = await Todo.query().where({ userId, id }).first();
  if (!todo) throw new NotFoundError("No such Todo!");
  res.send(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = +req.user;
  const deletedCount = await Todo.query().delete().where({ userId, id });
  if (!deletedCount) throw new NotFoundError("No such Todo!");
  res.send("deleted");
};
