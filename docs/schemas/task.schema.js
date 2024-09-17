/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - text
 *         - owner
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the task.
 *         text:
 *           type: string
 *           description: The text describing the task.
 *           example: "Buy groceries"
 *         completed:
 *           type: boolean
 *           description: Whether the task is completed.
 *           default: false
 *         owner:
 *           type: string
 *           description: The user ID of the task owner.
 *           example: "605c72ef1c4f2c001f9f3a6b"
 *       example:
 *         _id: "605c72ef1c4f2c001f9f3a6b"
 *         text: "Buy groceries"
 *         completed: false
 *         owner: "605c72ef1c4f2c001f9f3a6b"
 */
