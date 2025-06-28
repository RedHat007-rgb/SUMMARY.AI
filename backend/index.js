const express = require("express");
const authRouter = require("./routes/authroute");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.use("/api/v1/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is listening to ${PORT}`);
});
