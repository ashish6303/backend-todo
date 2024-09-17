/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the user.
 *         username:
 *           type: string
 *           description: The username of the user.
 *           example: "user1"
 *         email:
 *           type: string
 *           description: The email address of the user.
 *           example: "user1@example.com"
 *       example:
 *         _id: "605c72ef1c4f2c001f9f3a6b"
 *         username: "user1"
 *         email: "user1@example.com"
 */
