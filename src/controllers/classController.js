const catchAsync = require("../../utils/catchAsync");
const classService = require("../services/classService");

const getAll = async (req, res) => {
  const classes = await classService.getAll();
  res.status(200).json(classes);
};

const getById = async (req, res) => {
  const { classId } = req.params;
  const foundClass = await classService.getById(classId);
  res.status(200).json(foundClass);
};

const create = async (req, res) => {
  const classData = req.body;
  const newClass = await classService.create(classData);
  res.status(201).json(newClass);
};

const update = async (req, res) => {
  const { classId } = req.params;
  const classData = req.body;
  const updatedClass = await classService.update(classId, classData);
  res.status(200).json(updatedClass);
};

const deleteClass = async (req, res) => {
  const { classes } = req.body;
  const deletedClass = await classService.delete(classes);
  res.status(200).json(deletedClass);
};

const getStudents = async (req, res) => {
  const { classId } = req.params;
  const students = await classService.getStudents(classId);
  res.status(200).json(students);
};

const addStudent = async (req, res) => {
  const { classId } = req.params;
  const { students } = req.body;
  const updatedClass = await classService.addStudent(classId, students);
  res.status(200).json(updatedClass);
};

const removeStudent = async (req, res) => {
  const { classId } = req.params;
  const { students } = req.body;
  const classStudents = await classService.removeStudent(classId, students);
  res.status(200).json(classStudents);
};

module.exports = {
  create: catchAsync(create),
  getAll: catchAsync(getAll),
  getById: catchAsync(getById),
  update: catchAsync(update),
  delete: catchAsync(deleteClass),

  getStudents: catchAsync(getStudents),
  addStudent: catchAsync(addStudent),
  removeStudent: catchAsync(removeStudent),
};
