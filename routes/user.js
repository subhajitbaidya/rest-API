const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

//~routes

//?Server side rendering
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

//!Rest API

//*Client side rendering
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
