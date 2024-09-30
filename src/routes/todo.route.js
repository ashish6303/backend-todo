// src/routes/todoRoutes.js

import { Router } from 'express';
import { 
  createTodoControllers, 
  deleteAllTaskControllers, 
  deleteTaskControllers, 
  editTaskControllers, 
  getTaskControllers 
} from '../controllers/todo.controllers.js';
import swaggerDocs from 'swagger-jsdoc';

const router = Router();

// Attach Swagger documentation to the router
router.post('/:userId/todo', createTodoControllers);
router.get('/:userId/todo', getTaskControllers);
router.put('/:userId/todo/:taskId', editTaskControllers);
router.delete('/:userId/todo/:taskId', deleteTaskControllers);
router.delete('/:userId/todo', deleteAllTaskControllers);


router.use((req, res, next) => {
  res.swaggerDocs = swaggerDocs;
  next();
});

export default router;
