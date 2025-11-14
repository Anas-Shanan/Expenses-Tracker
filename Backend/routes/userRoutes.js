import { Router } from "express";
import * as userUpdate from "../controllers/userController.js";
import { authentication } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

router.put("/update", authentication, userUpdate.updateProfile);
router.put(
  "/profilePic",
  authentication,
  upload.single("profilePicture"),
  userUpdate.uploadProfilePic
);
router.delete("/profilePic", authentication, userUpdate.deleteProfilePic);

export default router;
