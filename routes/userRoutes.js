import express from "express";
import { createProfileCtrl } from "../controllers/userController.js";

//router object
const router = express.Router();

router.post("/create-profile", createProfileCtrl);
export default router;
