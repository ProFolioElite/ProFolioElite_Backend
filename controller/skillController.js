const UserProfile = require("../models/userProfileSchema"); // Adjust the path according to your project structure

const skills = async (req, res) => {
  try {
    const skill = req.query.skill; // Get the skill from query parameters

    const users = await UserProfile.aggregate([
      {
        $match: {
          skills: { $regex: skill, $options: "i" }, // Use regex to match skill
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          skills: 1,
          phone: 1,
          email: 1,
          workExperience: 1,
          experienceLevel: 1,
        },
      },
    ]);

    res.json(users); // Send the aggregation results as JSON response
  } catch (err) {
    res.status(500).send({ message: "Error occurred while fetching users" });
  }
};

module.exports = skills;
