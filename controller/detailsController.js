const UserProfile = require("../models/userProfileSchema"); // Adjust the path according to your project structure
const fs = require("fs");

const multer = require("multer");
const path = require("path");

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Create this folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// In route definition:
// Controller
const createUserProfile = async (req, res) => {
  try {
    // Get uploaded file path
    const profilePhoto = req.file ? req.file.path : null;

    // Parse other fields from FormData
    const {
      name,
      email,
      phone,
      about,
      profession,
      skills,
      experienceLevel,
      workExperience,
      openSourceContribution,
      projects,
      socialMediaLinks,
    } = req.body;

    // Convert stringified arrays/objects to JSON
    const parsedWorkExperience = JSON.parse(workExperience);
    const parsedSocialMediaLinks = JSON.parse(socialMediaLinks);

    // Create new profile
    const newUserProfile = new UserProfile({
      profilePhoto,
      name,
      email,
      phone,
      about,
      profession,
      skills: skills.split(","), // Convert comma-separated string to array
      experienceLevel,
      workExperience: parsedWorkExperience,
      openSourceContribution: JSON.parse(openSourceContribution),
      projects: JSON.parse(projects),
      socialMediaLinks: parsedSocialMediaLinks,
    });

    const savedProfile = await newUserProfile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserProfileDetails = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserProfile.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .json({ msg: "The email you enter is not our dataBase" });
    }
    console.log(user);
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(404).json({ msg: error });
  }
};

// const getuserInformationForPortfolio= async(req,res)=>{
//   const
// }

module.exports = { createUserProfile, getUserProfileDetails };
