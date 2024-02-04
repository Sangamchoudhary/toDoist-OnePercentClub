const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const db_link =
  "mongodb+srv://admin:sangam9069@onepercentclubcluster.tdaliur.mongodb.net/?retryWrites=true&w=majority";
const cookieParser = require("cookie-parser");
const app = express();

mongoose.set("strictQuery", true);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.listen(4000);
app.use(cookieParser());

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log("Database connected");
  })
  .catch(function (err) {
    console.log(err);
  });

const userRouter = require("./Router/userRouter");
app.use("/api/user", userRouter);

const taskRouter = require("./Router/taskRouter");
app.use("/api/task", taskRouter);

const getHomePage = require("./Router/getHomePage");
app.use("/api", getHomePage);

app.use((req, res) => res.redirect("/api"));