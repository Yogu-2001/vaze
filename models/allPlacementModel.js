import mongoose from "mongoose";

const allPlacedStudentSchema = new mongoose.Schema({
  placedStudent: [{ type: "ObjectId", ref: "profile-details" }],
});

export default mongoose.model("Placed Student", allPlacedStudentSchema);
