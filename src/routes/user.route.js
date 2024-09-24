import { Router } from "express";
import { deleteUserController, getAllUserController, registerUserController, updateUserController } from "../controllers/user.controller.js"
const router = Router();


router.post('/register', registerUserController);

router.get('/users', getAllUserController);

router.delete('/:userId', deleteUserController);

router.put('/:userId', updateUserController);

export default router;
