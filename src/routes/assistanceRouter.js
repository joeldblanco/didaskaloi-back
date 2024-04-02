const { Router } = require("express");
const assistanceController = require("../controllers/assistanceController");

const assistanceRouter = Router();

assistanceRouter.get("/:assistanceId", assistanceController.getById);
assistanceRouter.post(
  "/:assistanceId/register",
  assistanceController.registerAssistance
);
assistanceRouter.delete("/", assistanceController.deleteAssistance);
assistanceRouter.delete(
  "/:assistanceId/remove-student",
  assistanceController.removeStudent
);

module.exports = assistanceRouter;
