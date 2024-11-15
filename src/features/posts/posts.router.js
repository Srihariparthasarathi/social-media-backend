import express from "express";

import PostsController from "./posts.controller.js";

const router = express.Router();
const postsController = new PostsController();

router.get("/", postsController.getPostByUser);
router.get("/all", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", postsController.createPost);
router.delete("/", postsController.deletePost);
router.put("/", postsController.updatePost);






export default router;

