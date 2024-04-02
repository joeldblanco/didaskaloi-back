const { Router } = require("express");

const studentController = require("../controllers/studentController");

const validateStudent = require("../middlewares/validateStudent");

const studentRouter = Router();

studentRouter.get("/", studentController.getAll);
studentRouter.get("/:studentId", studentController.getById);
studentRouter.post("/", validateStudent, studentController.create);
studentRouter.put("/:studentId", validateStudent, studentController.update);
studentRouter.delete("/", studentController.delete);

module.exports = studentRouter;
