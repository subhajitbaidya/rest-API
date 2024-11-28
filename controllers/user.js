const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDBusers = await User.find({});
  return res.json(allDBusers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).json({ error: "user not found" });

  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  try {
    const { id } = req.params; // Extract the user ID from the request parameters.
    const { firstName, lastName, email, jobTitle, gender } = req.body; // Extract fields from the request body.

    // Update the user with the provided fields dynamically.
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, jobTitle, gender },
      { new: true, runValidators: true } // Options to return the updated document and validate.
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" }); // Handle user not found.
    }

    res.status(200).json({ message: "User updated successfully", updatedUser }); // Respond with success.
  } catch (error) {
    console.error(error); // Log any error.
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message }); // Handle errors.
  }
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ message: "User deleted successfully" });
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  console.log("result", result);

  return res.status(201).json({ msg: "success", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
