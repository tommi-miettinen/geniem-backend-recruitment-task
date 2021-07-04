import TodoList from "../models/TodoList";
import Todo from "../models/Todo";
import { Request, Response } from "../types";
import { NotFoundError } from "../Errors";

export const createTodoList = async (req: Request, res: Response) => {
  const todos: Todo[] = req.body.todos;
  const userId = +req.user;
  const todoList = await TodoList.transaction(async (trx) => {
    const todoList = await TodoList.query(trx).insert({ userId });
    const editedTodos = todos
      ? todos.map((todo) => ({
          ...todo,
          userId,
          todoListId: todoList.id,
        }))
      : [];
    await Todo.query(trx).insertGraph(editedTodos);
    return todoList;
  });
  res.send(todoList);
};

export const getTodoLists = async (req: Request, res: Response) => {
  const userId = +req.user;
  const todoList = await TodoList.query().where({ userId });
  if (!todoList.length) throw new NotFoundError("No Todolists found");
  res.send(todoList);
};

export const getTodoList = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = +req.user;
  const todoList = await TodoList.query().where({ userId, id });
  if (!todoList.length) throw new NotFoundError("No such Todolist!");
  res.send(todoList);
};

export const getItemsInTodoList = async (req: Request, res: Response) => {
  const todoListId = req.params.id;
  const userId = +req.user;
  const todos = await Todo.query().where({ userId, todoListId });
  if (!todos.length) throw new NotFoundError("No such Todos");
  res.send(todos);
};

export const deleteTodoList = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = +req.user;
  const deletedCount = await TodoList.query().delete().where({ userId, id });
  if (!deletedCount) throw new NotFoundError("No such Todolist!");
  res.send("deleted");
};
