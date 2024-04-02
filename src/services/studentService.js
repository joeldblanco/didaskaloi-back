const Student = require("../models/studentModel");
const Class = require("../models/classModel");

module.exports = {
  create: async (studentData) => {
    try {
      const newStudent = await Student.create(studentData);
      return newStudent;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  getAll: async () => {
    try {
      const students = await Student.find();
      return students;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  getById: async (studentId) => {
    try {
      const student = await Student.findById(studentId);
      return student;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  update: async (studentId, studentData) => {
    try {
      const studentToUpdate = await Student.findById(studentId);
      if (!studentToUpdate)
        throw { statusCode: 404, message: "Student not found" };

      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        studentData,
        { new: true }
      );
      return updatedStudent;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  delete: async (studentsIds) => {
    try {
      const studentsToDelete = await Student.find({
        _id: { $in: studentsIds },
      });

      await Student.deleteMany({ _id: { $in: studentsIds } });

      const students = await Student.find();

      return students;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },
};
