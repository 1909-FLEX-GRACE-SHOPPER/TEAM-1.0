const express = require("express");
const path = require("path");
const { db } = require("./db");
const chalk = require("chalk");
const cookieParser = require("cookie-parser");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

//initialize express
const app = express();
const PORT = process.env.PORT || 3000;

//cookie parser
app.use(cookieParser());

// body parsing middleware
app.use(express.json());
app.use(cors());

//adding this middleware just to keep track of api calls as our app gets larger
app.use((req, res, next) => {
  console.log(chalk.magenta(`${req.method} ${req.path}`));
  next();
});

// static middleware
app.use(express.static(path.join(__dirname, "../static")));

// api routes
app.use("/api", require("./api"));

//set user login cookies

app.use("/", require("./cookies"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/index.html"));
}); // Send index.html for any other requests

db.sync().then(() => {
  console.log(chalk.magenta("db synced"));
  app.listen(PORT, () => {
    console.log(chalk.cyan("I'm running on", PORT));
  });
});
