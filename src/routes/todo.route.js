import { Router } from "express";
import { createTodoControllers, deleteAllTaskControllers, deleteTaskControllers, editTaskControllers, getTaskControllers } from "../controllers/todo.controllers.js";

const router = Router();

router.post('/:userId/todo', createTodoControllers);
router.get('/:userId/todo', getTaskControllers);
router.put('/:userId/todo/:taskId', editTaskControllers);
router.delete('/:userId/todo/:taskId', deleteTaskControllers);
router.delete('/:userId/todo',deleteAllTaskControllers);


export default router;