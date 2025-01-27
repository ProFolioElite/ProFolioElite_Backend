const mongoose = require("mongoose");

// Define the main schema for the user profile

const userProfileSchema = new mongoose.Schema({
  profilePhoto: Buffer, // Store the profile photo as binary data
  name: { type: String, required: true },
  profilePhoto: String,
  email: { type: String, required: true, unique: true }, // Ensure email is unique
  phone: { type: String, required: true },
  about: String,
  profession: String,
  skills: { type: [String], default: [""] }, // Array of strings for skills, default to empty string
  experienceLevel: String,
  workExperience: [
    {
      companyName: String,
      designation: String,
      projectWorkedOn: String,
      projectBrief: String,
      contribution: String,
      document: String,
    },
  ],
  openSourceContribution: [
    {
      description: String,
      skillSet: String,
      link: String,
    },
  ],
  projects: [
    {
      description: String,
      skillSet: String,
      repoLink: String,
      liveLink: String,
    },
  ],
  socialMediaLinks: {
    linkedIn: String,
    instagram: String,
    leetCode: String,
    github: String,
    stackOverflow: String,
  },
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the profile was created
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
