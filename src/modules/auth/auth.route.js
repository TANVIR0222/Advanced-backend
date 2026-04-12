import { Router } from "express";

import validate from "../../common/middleware/validation.middleware.js";
import * as Controller from "./auth.controller.js";
import LoginDto from "./dto/login.dto.js";
import RegisterDto from "./dto/register.dto.js";
const router = Router();

router.post("/register", validate(RegisterDto), Controller.register);
router.post("/login", validate(LoginDto), Controller.login);
// router.post('/logout' , validate(LoginDto), authenticate ,Controller.logout)

export default router;
