import express from "express";
import { addStudents } from "../controllers/adminControllers.js";

//router object
const router = express.Router();

router.post("/add-student", addStudents);
export default router;
