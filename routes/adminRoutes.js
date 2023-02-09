import express from "express";
import {
  addNotice,
  addStudents,
  addPlacement,
  allstudents,
  updatePlacedStatus,
} from "../controllers/adminControllers.js";

//router object
const router = express.Router();

router.post("/add-student", addStudents);
router.post("/add-placement", addPlacement);
router.post("/add-notice", addNotice);
router.get("/get-allstudents", allstudents);
router.put("/update-placed-status", updatePlacedStatus);
export default router;
