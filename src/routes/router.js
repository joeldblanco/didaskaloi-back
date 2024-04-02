const express = require("express");
const router = express.Router();

const studentRouter = require("./studentRouter");
const classRouter = require("./classRouter");
const reportRouter = require("./reportRouter");
const assistanceRouter = require("./assistanceRouter");

router.use("/students", studentRouter);
router.use("/classes", classRouter);
router.use("/assistances", assistanceRouter);
router.use("/reports", reportRouter);

module.exports = router;
