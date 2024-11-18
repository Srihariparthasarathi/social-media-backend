// OM NAMASIVAYA
import express from "express";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

import isUserExistsMiddleware from "../../middlewares/isUserExists.middleware.js";

const router = express.Router();

router.get("/:id");
router.get("/toggle/:id");



export default router;
