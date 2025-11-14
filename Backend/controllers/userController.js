import User from "../models/User.js";
import fs from "fs";
import path from "path";

export async function updateProfile(req, res, next) {
  try {
    const { name, bio } = req.body;
    const opts = { runValidators: true, new: true };
    const updateFields = {};
    if (name) updateFields.name = name;
    if (bio !== undefined) updateFields.bio = bio;
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      opts
    );
    res.status(200).json({ msg: "profile updated successfuly", updated });
  } catch (error) {
    next(error);
  }
}

export async function uploadProfilePic(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "please upload a file" });
    }
    const user = await User.findById(req.user._id);
    const oldProfilePic = user.profilePic;
    if (oldProfilePic) {
      //const oldFilePath = path.join(__dirname, "..", oldProfilePic);
      const oldFilePath = path.join(process.cwd(), oldProfilePic);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }
    const profilePicPath = `uploads/${req.file.filename}`;
    user.profilePic = profilePicPath;
    await user.save();

    res.status(200).json({
      msg: "picture uploaded successfully",
      profilePic: profilePicPath,
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProfilePic(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user.profilePic) {
      return res.status(400).json({
        msg: "No profile picture to delete",
      });
    }
    //const oldFilePath = path.join(__dirname, "..", user.profilePic);
    const oldFilePath = path.join(process.cwd(), user.profilePic);
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }

    user.profilePic = "";
    await user.save();

    res.status(200).json({
      msg: "Profile picture deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
