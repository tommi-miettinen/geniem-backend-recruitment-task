import Router from "express-promise-router";
import { authenticateToken } from "./accounts/jwt";
import * as User from "./controllers/users";
import * as Todo from "./controllers/todos";
import * as TodoList from "./controllers/todoList";

const router = Router();

//user routes

router.post("/login", User.login);
router.get("/users", User.getUsers);
router.post("/users", User.createUser);
router.delete("/users", authenticateToken, User.deleteUser);

//todo routes

router.get("/todos", authenticateToken, Todo.getTodos);
router.post("/todos", authenticateToken, Todo.createTodo);
router.get("/todos/:id", authenticateToken, Todo.getTodo);
router.delete("/todos/:id", authenticateToken, Todo.deleteTodo);

//todolist routes

router.get("/todolists", authenticateToken, TodoList.getTodoLists);
router.post("/todolists", authenticateToken, TodoList.createTodoList);
router.get("/todolists/:id", authenticateToken, TodoList.getTodoList);
router.delete("/todolists/:id", authenticateToken, TodoList.deleteTodoList);
//prettier-ignore
router.get("/todolists/:id/todos", TodoList.getItemsInTodoList);

export default router;
