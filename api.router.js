import express from "express";

//routers
import userRouter from "./src/features/users/users.router.js";
import postsRouter from "./src/features/posts/posts.router.js";
import commentsRouter from "./src/features/comments/comments.router.js";
import likesRouter from "./src/features/likes/likes.router.js"
import bookmarksRouter from "./src/features/bookmarks/bookmarks.router.js"

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
router.use("/likes", likesRouter);
router.use("/bookmarks", bookmarksRouter);



export default router;