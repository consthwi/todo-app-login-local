const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
require("dotenv").config();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
console.log("mongouri", MONGODB_URI_PROD);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// app에 항상 router세팅... 그래서 exports하는거
app.use("/api", indexRouter);

// 백엔드는 env읽기 위해 npm 설치해야한다.
const mongoURI = MONGODB_URI_PROD;
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("db connection failed", err);
  });

app.listen(5000, () => {
  console.log("server on 5000");
});
