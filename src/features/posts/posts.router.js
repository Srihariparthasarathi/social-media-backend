import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

import imageUploadMiddleware from "../../middlewares/fileUplode.middleware.js";
import { postValidator } from "../../middlewares/validatorsMiddleware/postValidator.middleware.js"


import PostsController from "./posts.controller.js";

const router = express.Router();
const postsController = new PostsController();

router.get("/", jwtAuth, postsController.getPostByUser);
router.get("/all", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", jwtAuth, imageUploadMiddleware, postValidator, postsController.createPost);
router.delete("/:id", jwtAuth, postsController.deletePost);
router.put("/id", jwtAuth, postsController.updatePost);






export default router;

