import Todo from "../models/Todo";
import { NotFoundError } from "../Errors";

export const getTodos = async (req, res) => {
  const userId = req.user;
  const todos = await Todo.query().where({ userId });
  if (!todos.length) throw new NotFoundError("No todos!");
  res.send(todos);
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user;
  const result = await Todo.query().insert({
    title,
    description,
    userId,
  });
  res.send(result);
};

export const getTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  const todo = await Todo.query().where({ userId, id }).first();
  const err = new NotFoundError("test");
  console.log(err, "statuscode");
  if (!todo) throw new NotFoundError("No such Todo!");
  res.send(todo);
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  const result = await Todo.query().delete().where({ userId, id });
  if (!result) throw new NotFoundError("No such Todo!");
  res.send("deleted");
};
