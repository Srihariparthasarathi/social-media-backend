// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";
import checkPostExists from "../../middlewares/validatorsMiddleware/likesAndBookmarksValidator.middleware.js"

import BookMarksController from "./bookmarks.controller.js"
const router = express.Router();
const bookMarksController = new BookMarksController();

router.get("/:id", jwtAuth, isUserExistsMiddleware, checkPostExists, bookMarksController.checkBookMark);
router.get("/toggle/:id", jwtAuth, isUserExistsMiddleware, checkPostExists, bookMarksController.toggleBookMark);



export default router;
