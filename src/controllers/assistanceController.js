const catchAsync = require("../../utils/catchAsync");
const classService = require("../services/classService");
const assistancesService = require("../services/assistancesService");

const registerAssistance = async (req, res) => {
  const { assistanceId } = req.params;
  const { students } = req.body;

  const updatedStudents = await assistancesService.registerAssistance(
    assistanceId,
    students
  );

  res.status(201).json(updatedStudents);
};

const getAssistances = async (req, res) => {
  const { classId } = req.params;

  const assistances = await classService.getAssistances(classId);

  res.status(200).json(assistances);
};

const getById = async (req, res) => {
  const { assistanceId } = req.params;

  console.log(assistanceId);

  const assistance = await assistancesService.getAssistanceById(assistanceId);

  res.status(200).json(assistance);
};

const createAssistance = async (req, res) => {
  const { classId } = req.params;
  const { date } = req.body;

  const updatedClass = await classService.createAssistance(classId, date);

  res.status(201).json(updatedClass);
};

const deleteAssistance = async (req, res) => {
  const { assistances } = req.body;

  const classAssistances = await assistancesService.deleteAssistance(
    assistances
  );

  res.status(200).json(classAssistances);
};

const removeStudent = async (req, res) => {
  const { assistanceId } = req.params;
  const { students } = req.body;

  const updatedStudents = await assistancesService.removeStudent(
    assistanceId,
    students
  );

  res.status(200).json(updatedStudents);
};

module.exports = {
  registerAssistance: catchAsync(registerAssistance),
  getAssistances: catchAsync(getAssistances),
  getById: catchAsync(getById),
  createAssistance: catchAsync(createAssistance),
  deleteAssistance: catchAsync(deleteAssistance),
  removeStudent: catchAsync(removeStudent),
};
