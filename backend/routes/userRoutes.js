import express from "express";
import {
  authUser,
  registerUser,
  resendverificationMail,
  updateUserProfile,
  verifyUser,
  addAssets,
  updateTransactionPin,
  resetPassword
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyUser);
router.post("/regsuccess", resendverificationMail);
router.post("/resetpassword", resetPassword);
router.post("/addfunds", addAssets);
router.post("/updatetransactionpin", updateTransactionPin);
router.post("/login/users", authUser);
router.route("/profile").post(protect, updateUserProfile);

export default router;
