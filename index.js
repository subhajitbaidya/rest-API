const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

// ? MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/rest-API")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error", err));

// ? schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

//Middleware
app.use(express.urlencoded({ extended: false }));

//routes

//Server side rendering
app.get("/users", async(req, res) => {
  const allDBusers = await User.find({});
  const html = `
    <ul>
     ${allDBusers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

//Rest API

//Client side rendering
app.get("/api/users", async(req, res) => {
  const allDBusers = await User.find({});
  res.setHeader("X-Name", "Subhajit Baidya");
  return res.json(allDBusers);
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(400).json({error: "user not found"});
    
    return res.json(user);
  })
  .patch(async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});

    res.status(200).json({ message: "User updated successfully"});
  })
  .delete(async(req, res) => {
    await User.findOneAndDelete(req.params.id);
    return res.status(200).json({message: "User deleted successfully"});
  });

app.post("/api/users", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
