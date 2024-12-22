const UserProfile = require("../models/userProfileSchema"); // Adjust the path according to your project structure
const fs = require("fs");

// Controller function to create a new user profile
const createUserProfile = async (req, res) => {
  try {
    // Extract form data from the request body
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

    // Check if a profile photo is uploaded
    let profilePhoto = null;
    if (req.file) {
      // Assuming you are using a middleware like multer for file uploads
      profilePhoto = fs.readFileSync(req.file.path); // Read the uploaded file as binary data
    }

    // Create a new user profile instance
    const newUserProfile = new UserProfile({
      profilePhoto,
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
    });

    // Save the user profile to the database
    const savedProfile = await newUserProfile.save();

    // Send a success response
    return res.status(201).json({
      message: "User profile created successfully",
      data: savedProfile,
    });
  } catch (error) {
    console.error("Error creating user profile:", error);
    return res.status(500).json({
      message: "Failed to create user profile",
      error: error.message,
    });
  }
};

const getUserProfileDetails = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserProfile.findOne({ email:email });
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
