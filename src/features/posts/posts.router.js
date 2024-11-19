import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

import imageUploadMiddleware from "../../middlewares/fileUplode.middleware.js";
import { postValidator } from "../../middlewares/validatorsMiddleware/postValidator.middleware.js"
import deletePreviousImage from "../../middlewares/deleteImage.middleware.js";
import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";


import PostsController from "./posts.controller.js";

const POST_FEATURE_TYPE = "posts";

const router = express.Router();
const postsController = new PostsController();

router.get("/", jwtAuth, postsController.getPostByUser);
router.get("/all", postsController.getAllPosts);
router.get("/:id", postsController.getPostById);
router.post("/", jwtAuth, isUserExistsMiddleware, imageUploadMiddleware, postValidator(), postsController.createPost);
router.delete("/:id", jwtAuth,isUserExistsMiddleware, postsController.deletePost);
router.put("/:id", jwtAuth, isUserExistsMiddleware, imageUploadMiddleware, postValidator(true), deletePreviousImage(POST_FEATURE_TYPE), postsController.updatePost);


export default router;

