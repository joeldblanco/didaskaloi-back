const catchAsync = require("../../utils/catchAsync");
const classService = require("../services/classService");
const studentService = require("../services/studentService");

const getAll = async (req, res) => {
  const students = await studentService.getAll();
  res.status(200).json(students);
};

const create = async (req, res) => {
  const studentData = req.body;
  const newStudent = await studentService.create(studentData);
  res.status(201).json(newStudent);
};

const getById = async (req, res) => {
  const { studentId } = req.params;
  const student = await studentService.getById(studentId);
  res.status(200).json(student);
};

const update = async (req, res) => {
  const { studentId } = req.params;
  const studentData = req.body;
  const updatedStudent = await studentService.update(studentId, studentData);
  res.status(200).json(updatedStudent);
};

const deleteStudent = async (req, res) => {
  try {
    const { studentsIds } = req.body;

    const toDeleteStudents = await Promise.all(
      studentsIds.map(async (studentId) => {
        const student = await studentService.getById(studentId);
        return student;
      })
    );

    await Promise.all(
      toDeleteStudents.map(async (student) => {
        await Promise.all(
          student.classes.map(async (classId) => {
            await classService.removeStudent(classId, student._id);
          })
        );
      })
    );

    const deletedStudents = await studentService.delete(studentsIds);

    res.status(200).json(deletedStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  create: catchAsync(create),
  getAll: catchAsync(getAll),
  getById: catchAsync(getById),
  update: catchAsync(update),
  delete: catchAsync(deleteStudent),
};
