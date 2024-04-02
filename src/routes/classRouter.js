const { Router } = require("express");

const classController = require("../controllers/classController");
const assistanceController = require("../controllers/assistanceController");
const reportController = require("../controllers/reportController");
const validateClass = require("../middlewares/validateClass");
const validateAssistance = require("../middlewares/validateAssistance");

const classRouter = Router();

classRouter.get("/", classController.getAll);
classRouter.post("/", validateClass, classController.create);
classRouter.get("/:classId", classController.getById);
classRouter.put("/:classId", classController.update);
classRouter.delete("/", classController.delete);

classRouter.get("/:classId/students", classController.getStudents);
classRouter.post("/:classId/add-student", classController.addStudent);
classRouter.delete("/:classId/remove-student", classController.removeStudent);

classRouter.get("/:classId/assistance", assistanceController.getAssistances);
classRouter.get(
  "/:classId/assistance/:assistanceId",
  assistanceController.getById
);
classRouter.post(
  "/:classId/assistance",
  validateAssistance,
  assistanceController.createAssistance
);
classRouter.delete(
  "/:classId/assistance",
  assistanceController.deleteAssistance
);

classRouter.get(
  "/classes/:classId/reports",
  reportController.generatePerClassReport
);

module.exports = classRouter;
