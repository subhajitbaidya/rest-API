const express = require("express");
const { handleGetAllUsers, handleGetUserById } = require("../controllers/user");
const router = express.Router();

//~routes

//Server side rendering
// router.get("/users", async (req, res) => {
//     const allDBusers = await User.find({});
//     const html = `
//       <ul>
//        ${allDBusers
//          .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
//          .join("")}
//       </ul>
//       `;
//     res.send(html);
//   });

//Rest API

//*Client side rendering
router.get("/", handleGetAllUsers);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });

    res.status(200).json({ message: "User updated successfully" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "User deleted successfully" });
  });

router.post("/", async (req, res) => {
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

  return res.status(201).json({ msg: "success" });
});

module.exports = router;
