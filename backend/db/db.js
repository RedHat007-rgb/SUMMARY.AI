const mongoose = require("mongoose");

const dbConnect = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log("connected top db....");
  } catch {
    console.log("Error connecting to db....");
  }
};

module.exports = { dbConnect };
