const router = require("express-promise-router")();

import { authenticateToken } from "./accounts/jwt";
import * as User from "./controllers/users";
import * as Todo from "./controllers/todos";
import * as TodoList from "./controllers/todoList";

//user routes

router.get("/users", User.getUsers);
router.post("/users", User.createUser);
router.post("/login", User.login);
router.delete("/users", authenticateToken, User.deleteUser);

//todo routes

router.get("/todos", authenticateToken, Todo.getTodos);
router.post("/todos", authenticateToken, Todo.createTodo);
router.get("/todos/:id", authenticateToken, Todo.getTodo);
router.delete("/todos/:id", authenticateToken, Todo.deleteTodo);

//todolist routes

router.post("/todolists", authenticateToken, TodoList.createTodoList);
router.delete("/todolists/:id", authenticateToken, TodoList.deleteTodoList);
router.get("/todolists/:id", authenticateToken, TodoList.getItemsInTodoList);
router.get("/todolists", authenticateToken, TodoList.getTodoLists);

export default router;
