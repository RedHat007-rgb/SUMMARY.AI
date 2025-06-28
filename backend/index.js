const express = require("express");
const authRouter = require("./routes/authroute");
const { dbConnect } = require("./db/db");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
app.use(express.json());
app.use("/api/v1/auth", authRouter);

const connect = async () => {
  try {
    await dbConnect(MONGO_URL);
    app.listen(process.env.PORT, () => {
      console.log(`server is listening to ${PORT}`);
    });
  } catch {
    console.log("Internal server error");
  }
};

connect();
