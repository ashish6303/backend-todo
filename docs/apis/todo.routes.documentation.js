/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo task management operations
 */

/**
 * @swagger
 * /{userId}/todo:
 *   post:
 *     summary: Create a new TODO task for a user
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user for whom the task is being created
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The text of the TODO task
 *                 example: "Buy groceries"
 *               completed:
 *                 type: boolean
 *                 description: Whether the TODO task is completed
 *                 default: false
 *     responses:
 *       201:
 *         description: TODO task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the created TODO task
 *                 text:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 owner:
 *                   type: string
 *       400:
 *         description: Bad request due to invalid input
 */

/**
 * @swagger
 * /{userId}/todo:
 *   get:
 *     summary: Retrieve all TODO tasks for a user
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose TODO tasks are being retrieved
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of TODO tasks for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   text:
 *                     type: string
 *                   completed:
 *                     type: boolean
 *                   owner:
 *                     type: string
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /{userId}/todo/{taskId}:
 *   put:
 *     summary: Update a TODO task for a user
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user who owns the TODO task
 *         schema:
 *           type: string
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the TODO task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 description: The new text of the TODO task
 *               completed:
 *                 type: boolean
 *                 description: Whether the TODO task is completed
 *     responses:
 *       200:
 *         description: TODO task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the updated TODO task
 *                 text:
 *                   type: string
 *                 completed:
 *                   type: boolean
 *                 owner:
 *                   type: string
 *       400:
 *         description: Bad request
 *       404:
 *         description: TODO task not found
 */

/**
 * @swagger
 * /{userId}/todo/{taskId}:
 *   delete:
 *     summary: Delete a TODO task for a user
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user who owns the TODO task
 *         schema:
 *           type: string
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the TODO task to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TODO task deleted successfully
 *       404:
 *         description: TODO task not found
 */

/**
 * @swagger
 * /{userId}/todo:
 *   delete:
 *     summary: Delete all TODO tasks for a user
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user whose TODO tasks are being deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: All TODO tasks deleted successfully
 *       404:
 *         description: User not found
 */

export default {}; // This file serves as a documentation file only
