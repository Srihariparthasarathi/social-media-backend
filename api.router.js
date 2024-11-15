import express from "express";

//routers
import userRouter from "./src/features/users/users.router.js"
import postsRouter from "./src/features/posts/posts.router.js"

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postsRouter)




export default router;