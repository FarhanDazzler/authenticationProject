const express = require("express");
const app = express();
require("./models/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouters = require("./Routers/AuthRouters");
const prodRouters = require("./Routers/ProductRouter");

require("dotenv").config({ path: "./.env" });

const port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use("/auth", authRouters);
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/product", prodRouters);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, (req, res) => {
  console.log("Server is running at PORT:", port);
});
