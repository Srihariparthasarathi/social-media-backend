// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";

import LikesController from "./likes.controller.js";

const router = express.Router();
const likesController = new LikesController();

router.get("/:id",likesController.getLikesByPostId);
router.get("/toggle/:id",jwtAuth,isUserExistsMiddleware, likesController.toggleLikes);



export default router;
