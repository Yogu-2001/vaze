import express from "express";
import {
  createProfileCtrl,
  getAllNotificationCtrl,
} from "../controllers/userController.js";

//router object
const router = express.Router();

router.post("/create-profile", createProfileCtrl);
router.get("/get-all-notifications", getAllNotificationCtrl);
export default router;
