// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";
import CommentsController from "./comments.controller.js";

const router = express.Router();
const commentsController = new CommentsController();

router.get("/:id", commentsController.getAllComments);
router.post("/:id");
router.put("/:id");
router.delete("/:id");







export default router;