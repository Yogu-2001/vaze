import express from "express";
const router = express.Router();
import commentModel from "../models/commentModel.js";
router.post("/add-query", async (req, res) => {
  try {
    const query = await commentModel(req.body);
    await query.save();
    res.status(200).json({ message: "query added succces", query });
  } catch (error) {
    res.status(501).json({ message: "failed to add query" });
  }
});

export default router;
