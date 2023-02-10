import express from "express";
import {
  createProfileCtrl,
  getAllDrives,
} from "../controllers/userController.js";

//router object
const router = express.Router();

router.post("/create-profile", createProfileCtrl);
router.get("/get-all-drives", getAllDrives);
export default router;
