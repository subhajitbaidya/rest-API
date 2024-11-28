const mongoose = require("mongoose");

async function connectMongoDb(url) {
  // ? MongoDB connection
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDb,
};
