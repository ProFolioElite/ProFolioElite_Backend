const mongoose = require("mongoose");
const User = require("./User"); // Assuming this is necessary for referencing User if needed

const UserDetailsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
    userName: { type: String, required: true },
    phone: { type: String, required: true },
    aboutYourSelf: { type: String, required: true },
    profession: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    skills: { type: [String], required: true }, // Changed to an array of strings
    workExperience: [
      {
        companyName: { type: String, required: true },
        designation: { type: String, required: true },
        projectName: { type: String, required: true },
        projectBrief: { type: String, required: true }, // Fixed spelling from 'projectBreif' to 'projectBrief'
        contribution: { type: String, required: true },
        uploadDocument: { type: String, required: true }, // Changed type to String for document URLs or paths
      },
    ],
    openSource: [
      {
        description: { type: String, required: true },
        skillSet: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    projects: [
      {
        projectDescription: { type: String, required: true },
        skillSet: { type: String, required: true },
        githubLink: { type: String, required: true },
        liveLink: { type: String, required: true },
      },
    ],
    socialMedia: {
      linkedIn: { type: String, required: true },
      instagram: { type: String, required: true },
      leetCode: { type: String, required: true },
      github: { type: String, required: true },
    },
  },
  { timestamps: true } // Optional: adds createdAt and updatedAt timestamps
);

// Create the UserDetails model
const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);

module.exports = UserDetails;
