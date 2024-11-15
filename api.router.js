import express from "express";

//routers
import userRouter from "./src/features/users/users.router.js"

const router = express.Router();

router.use("/users", userRouter);




export default router;