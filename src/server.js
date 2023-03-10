import express from 'express';
import { userRouter } from "./routers/userRouter.js";


const app = express();

app.use("/user", userRouter);

export default app;