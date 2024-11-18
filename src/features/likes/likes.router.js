// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";
import checkPostExists from "../../middlewares/validatorsMiddleware/likesAndBookmarksValidator.middleware.js"

import LikesController from "./likes.controller.js";

const router = express.Router();
const likesController = new LikesController();

router.get("/:id", checkPostExists, likesController.getLikesByPostId);
router.get("/toggle/:id",jwtAuth,isUserExistsMiddleware, checkPostExists, likesController.toggleLikes);



export default router;
