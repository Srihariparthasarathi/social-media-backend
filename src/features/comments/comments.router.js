// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";
import CommentsController from "./comments.controller.js";

import { newCommentValidator, updateCommentValidator } from "../../middlewares/validatorsMiddleware/commentsValidator.middleware.js";
import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";

const router = express.Router();
const commentsController = new CommentsController();

router.get("/:id", commentsController.getAllComments);
router.post("/:id", jwtAuth,isUserExistsMiddleware, newCommentValidator, commentsController.createComment);
router.put("/:id", jwtAuth, isUserExistsMiddleware, updateCommentValidator, commentsController.updateComment);
router.delete("/:id", jwtAuth, isUserExistsMiddleware, commentsController.deleteComment);







export default router;