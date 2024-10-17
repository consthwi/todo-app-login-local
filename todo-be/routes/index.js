const express = require("express");
const router = express.Router();
const taskApi = require("./task.api");

router.use("/tasks", taskApi);
// /tasks경로에 taskApi미들웨어 장착

module.exports = router;
