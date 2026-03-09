const express = require("express");
const userRouter = require("./Routes/userRouter");
const adminRouter = require("./Routes/adminRoute");
const applyRouter = require("./Routes/applyRoute");
const cors = require("cors");
require("dotenv").config();
require("./Models/db");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/job", adminRouter, applyRouter);

app.get("/get", (req, res) => {
  res.send("pong practice route is working successfully");
});

app.listen(process.env.PORT, () => {
  console.log("server is runnig at port 8080");
});
