const UserDetails = require("../models/UserDetails");

exports.saveUserDetails = async (req, res) => {
  try {
    const details = new UserDetails(req.body); // Use const for defining details
    await details.save();
    res.status(201).json({ msg: "Your details have been saved." }); // Changed status to 201 for resource creation
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Changed status to 400 for bad request errors
  }
};
