import profileModel from "../models/profileModel.js";
import placementModel from "../models/placementModel.js";
export const createProfileCtrl = async (req, res) => {
  try {
    const profile = new profileModel(req.body);
    await profile.save();
    res.status(200).json({ message: "profile created success", success: true });
  } catch (error) {
    res.status(500).json({
      message: "profile creation failed",
      success: false,
      error: error.message,
    });
  }
};

export const getAllDrives = async (req, res) => {
  try {
    const alldrives = await placementModel.find({});
    res.status(200).json(alldrives);
  } catch (error) {
    res.status(501).json({ message: "failed to fetch all drives", error });
  }
};
