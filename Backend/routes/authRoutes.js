import { Router } from "express";
import { authentication } from "../middleware/authMiddleware.js";
import * as user from "../controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

router.post("/register", upload.single("profilePic"), user.register);
router.post("/login", user.login);
router.post("/logout", authentication, user.logout);
router.get("/me", authentication, user.currentUser);
export default router;
