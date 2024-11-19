// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

import imageUploadMiddleware from "../../middlewares/fileUplode.middleware.js";
import deletePreviousImage from "../../middlewares/deleteImage.middleware.js";
import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";
import { draftValidator } from "../../middlewares/validatorsMiddleware/postValidator.middleware.js";

import DraftsController from "./drafts.controller.js";

const DRAFT_FEATURE_TYPE = "drafts";

const router = express.Router();
const draftsController = new DraftsController();

router.get("/",jwtAuth, isUserExistsMiddleware, draftsController.getAllDraftsByUserId);
router.post("/", jwtAuth, isUserExistsMiddleware, imageUploadMiddleware, draftValidator(), draftsController.createDraftItem);
router.get("/:id", jwtAuth, isUserExistsMiddleware, draftsController.getDraftItemById);
router.put("/:id", jwtAuth, isUserExistsMiddleware, imageUploadMiddleware, draftValidator(true), deletePreviousImage(DRAFT_FEATURE_TYPE), draftsController.updateDraftItem);
router.delete("/:id", jwtAuth,isUserExistsMiddleware, draftsController.deleteDraftItem);
router.post("/archive/:id");



export default router;

