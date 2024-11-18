// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

import imageUploadMiddleware from "../../middlewares/fileUplode.middleware.js";
import deletePreviousImage from "../../middlewares/deleteImage.middleware.js";
import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";

const router = express.Router();

router.get("/");
router.post("/");
router.get("/:id");
router.put("/:id");
router.delete("/:id");
router.post("/archive/:id");



export default router;

