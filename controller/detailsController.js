const UserDetails = require("../models/UserDetails");
const User = require("../models/User");
const { ObjectId } = require("mongodb"); // Ensure you import ObjectId if not already done

exports.saveUserDetails = async (req, res) => {
  try {
    const details = new UserDetails(req.body); // Use const for defining details
    await details.save();
    res.status(201).json({ msg: "Your details have been saved." }); // Changed status to 201 for resource creation
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Changed status to 400 for bad request errors
  }
};

// exports.userProfession = async (req, res) => {
//     const { _id } = req.params;
//     const { profession } = req.body;
  
//     // Validate that _id is a valid ObjectId
//     // if (!ObjectId.isValid(_id)) {
//     //   return res.status(400).json({ msg: "Invalid user ID format" });
//     // }
  
//     try {
//       const user = await User.findById(new ObjectId(_id));
//       if (!user) {
//         return res.status(404).json({ msg: "User not found" });
//       }
  
//       // Update the user's profession field
//       user.profession = profession; // Assuming the User schema has a profession field
//       await user.save(); // Save the updated user
  
//       res.status(200).json({ msg: "The profession has been set" });
//     } catch (error) {
//       res.status(500).json({ msg: error.message });
//     }
//   };
