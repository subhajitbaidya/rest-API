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

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
};
