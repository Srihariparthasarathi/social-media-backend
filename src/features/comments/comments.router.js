// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";
import CommentsController from "./comments.controller.js";

import { newCommentValidator } from "../../middlewares/validatorsMiddleware/commentsValidator.middleware.js";
import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";

const router = express.Router();
const commentsController = new CommentsController();

router.get("/:id", commentsController.getAllComments);
router.post("/:id", jwtAuth,isUserExistsMiddleware, newCommentValidator, commentsController.createComment);
router.put("/:id");
router.delete("/:id");







export default router;