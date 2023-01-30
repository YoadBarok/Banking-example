import { userController } from "../controllers/userController.js";
import {Router, json} from 'express'


export const userRouter = Router();

userRouter.use(json());

userRouter.post("/register", userController.register);
userRouter.post("/deposit", userController.modifyBalance);
userRouter.post("/withdraw", userController.modifyBalance);

