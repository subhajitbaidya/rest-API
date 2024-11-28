const express = require("express");
const userRouter = require("./routes/user");
const { connectMongoDb } = require("./connection");
const {logReqRes} = require("./middlewares")

const app = express();
const port = 3000;

connectMongoDb("mongodb://127.0.0.1:27017/rest-API");

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
