import TodoList from "../models/TodoList";
import Todo from "../models/Todo";
import { NotFoundError } from "../Errors";

export const createTodoList = async (req, res) => {
  const { todos } = req.body;
  const userId = req.user;
  const result = await TodoList.transaction(async (trx) => {
    const todoList = await TodoList.query(trx).insert({ userId });
    const editedTodos =
      todos &&
      todos.map((todo) => ({
        ...todo,
        userId,
        todoListId: todoList.id,
      }));
    await Todo.query(trx).insertGraph(editedTodos);
    return todoList;
  });
  res.send(result);
};

export const getTodoLists = async (req, res) => {
  const userId = req.user;
  const result = await TodoList.query().where({ userId });
  if (!result.length) throw new NotFoundError("No Todolists found");
  res.send(result);
};

export const getItemsInTodoList = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  const result = await Todo.query().where({ userId, todoListId: id });
  if (!result.length) throw new NotFoundError("No such Todolist");
  res.send(result);
};

export const deleteTodoList = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  const result = await TodoList.query().delete().where({ userId, id });
  if (!result) throw new NotFoundError("No such Todolist!");
  res.send("deleted");
};
