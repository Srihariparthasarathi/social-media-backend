// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

import imageUploadMiddleware from "../../middlewares/fileUplode.middleware.js";
import deletePreviousImage from "../../middlewares/deleteImage.middleware.js";
import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";

import DraftsController from "./drafts.controller.js";

const router = express.Router();
const draftsController = new DraftsController();

router.get("/",jwtAuth, isUserExistsMiddleware, draftsController.getAllDraftsByUserId);
router.post("/");
router.get("/:id");
router.put("/:id");
router.delete("/:id");
router.post("/archive/:id");



export default router;

