import express from "express";
import {
  addNotice,
  addStudents,
  addPlacement,
  allstudents,
  addPlacedStudent,
} from "../controllers/adminControllers.js";

//router object
const router = express.Router();

router.post("/add-student", addStudents);
router.post("/add-placement", addPlacement);
router.post("/add-notice", addNotice);
router.get("/get-allstudents", allstudents);
router.post("/add-placed-students", addPlacedStudent);
export default router;
