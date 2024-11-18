// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

import imageUploadMiddleware from "../../middlewares/fileUplode.middleware.js";
import deletePreviousImage from "../../middlewares/deleteImage.middleware.js";
import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";
import { createDraftValidator, updateDraftValidator } from "../../middlewares/validatorsMiddleware/draftValidator.middleware.js"

import DraftsController from "./drafts.controller.js";

const router = express.Router();
const draftsController = new DraftsController();

router.get("/",jwtAuth, isUserExistsMiddleware, draftsController.getAllDraftsByUserId);
router.post("/", jwtAuth, isUserExistsMiddleware, imageUploadMiddleware, createDraftValidator, draftsController.createDraftItem);
router.get("/:id", jwtAuth, isUserExistsMiddleware, draftsController.getDraftItemById);
router.put("/:id");
router.delete("/:id");
router.post("/archive/:id");



export default router;

