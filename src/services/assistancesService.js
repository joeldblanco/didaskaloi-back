const Assistance = require("../models/assistanceModel");
const Class = require("../models/classModel");
const Student = require("../models/studentModel");

module.exports = {
  registerAssistance: async (assistanceId, students) => {
    try {
      const studentsToUpdate = await Student.updateMany(
        { _id: { $in: students } },
        { $addToSet: { records: assistanceId } }
      );

      return studentsToUpdate;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  getAssistanceById: async (assistanceId) => {
    try {
      const assistance = await Assistance.findById(assistanceId);

      if (!assistance)
        throw { statusCode: 404, message: "Assistance not found" };

      const assistanceClass = await Class.find({
        _id: assistance.class,
      });

      const assistanceStudents = await Student.find({
        records: { $in: assistance._id },
      });

      const formattedAssistance = {
        ...assistance._doc,
        class: assistanceClass[0],
        students: assistanceStudents,
      };

      return formattedAssistance;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  deleteAssistance: async (assistances) => {
    try {
      const classId = assistances[0].class;

      const students = await Student.find({ records: { $in: assistances } });
      students.forEach(async (student) => {
        await Student.updateOne(
          { _id: student._id },
          { $pull: { records: { $in: assistances } } }
        );
      });

      await Assistance.deleteMany({ _id: { $in: assistances } });

      const records = await Assistance.find({ class: classId });

      return records;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  removeStudent: async (assistanceId, students) => {
    try {
      const updatedStudents = await Student.updateMany(
        { _id: { $in: students } },
        { $pull: { records: assistanceId } }
      );

      return updatedStudents;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },
};
