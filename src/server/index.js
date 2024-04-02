const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("../routes/router");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

app.use((err, req, res, next) =>
  res.status(err.statusCode || 500).send({ message: err.message })
);

module.exports = app;
