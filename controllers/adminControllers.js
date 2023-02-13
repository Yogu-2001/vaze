import userModel from "../models/userModel.js";
import noticeModel from "../models/noticeModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import placementModel from "../models/placementModel.js";
import profileModel from "../models/profileModel.js";
import allPlacementModel from "../models/allPlacementModel.js";
export const addStudents = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validations

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered ",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

export const addNotice = async (req, res) => {
  try {
    const notice = new noticeModel(req.body);
    await notice.save();
    res.status(200).json({ success: true, message: "notice added success" });
  } catch (error) {
    res.status(501).json({
      message: "Failed to add notice",
      success: false,
    });
  }
};

export const addPlacement = async (req, res) => {
  try {
    const notice = new placementModel(req.body);
    await notice.save();
    res.status(200).json({ success: true, message: "placement added success" });
  } catch (error) {
    res.status(501).json({
      message: "Failed to add placement",
      success: false,
      error: error,
    });
  }
};

export const allstudents = async (req, res) => {
  try {
    const allstudents = await profileModel.find({});
    const allCompanies = await placementModel.find({});
    res.status(200).json({ allstudents, allCompanies });
  } catch (error) {
    res.status(501).json({
      message: "Failed to fetch students",
      success: false,
      error: error,
    });
  }
};

export const updatePlacedStatus = async (req, res) => {
  try {
    const updated = await profileModel.updateMany(
      { _id: { $in: req.body.selectedRows } },
      {
        $set: {
          placed: true,
        },
        $push: {
          placedData: {
            company: req.body.companyName,
            package: req.body.package,
          },
        },
      },

      { multi: true }
    );

    res.status(200).send({ message: "records updated successfully" });
  } catch (error) {
    res.status(501).json({
      message: "update failed",
      success: false,
      error: error,
    });
  }
};
