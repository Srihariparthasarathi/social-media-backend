import express from "express";

import UserController from "./users.controller.js";
import { signinValidator, signupValidator } from "../../middlewares/validatorsMiddleware/userValidator.middleware.js";
import checkPostExists from "../../middlewares/validatorsMiddleware/likesAndBookmarksValidator.middleware.js";


const router = express.Router();
const userController = new UserController();


router.post("/signup",signupValidator, userController.signup);
router.post("/signin",signinValidator , userController.signin);



export default router;