const { Router } = require("express");

const reportController = require("../controllers/reportController");

const reportRouter = Router();

reportRouter.get("/general", reportController.generateGeneralReport);

module.exports = reportRouter;
