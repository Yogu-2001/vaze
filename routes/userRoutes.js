import express from "express";
import {
  createProfileCtrl,
  getAllDrives,
  getallplacedcompanies,
  getProfile,
} from "../controllers/userController.js";

//router object
const router = express.Router();

router.post("/create-profile", createProfileCtrl);
router.get("/get-all-drives", getAllDrives);
router.get("/get-profile-details/:id", getProfile);
router.get("/get-all-companies/:id", getallplacedcompanies);
export default router;
