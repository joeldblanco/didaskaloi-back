const Class = require("../models/classModel");
const Student = require("../models/studentModel");
const Assistance = require("../models/assistanceModel");

module.exports = {
  create: async (classData) => {
    try {
      const { day } = classData;

      const days = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
      };

      classData.day = days[day.toLowerCase()];

      const newClass = await Class.create(classData);
      return newClass;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  getAll: async () => {
    try {
      const classes = await Class.find().sort({ day: 1, time: 1 });

      const days = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
      };

      const records = await Assistance.find({ class: { $in: classes } });

      const formattedClasses = await Promise.all(
        classes.map(async (bClass) => {
          const students = await Student.find({ classes: bClass._id }).lean();
          return {
            ...bClass._doc,
            day: days[bClass.day],
            students: students.map((student) => ({ ...student })),
            records,
          };
        })
      );

      return formattedClasses;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  getById: async (classId) => {
    try {
      const classFound = await Class.findById(classId);

      if (!classFound) {
        throw { statusCode: 404, message: "Class not found" };
      }

      const records = await Assistance.find({ class: classId });

      const students = await Student.find({ classes: classId });

      const formattedRecords = await Promise.all(
        records.map(async (record) => {
          const assistanceStudents = await Student.find({
            records: { $in: record._id },
          });

          return {
            ...record._doc,
            students: assistanceStudents.length,
          };
        })
      );

      const formattedClass = {
        ...classFound._doc,
        students,
        formattedRecords,
      };

      return formattedClass;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  update: async (classId, classData) => {
    try {
      const classToUpdate = await Class.findById(classId);

      if (!classToUpdate) {
        throw { statusCode: 404, message: "Class not found" };
      }

      const updatedClass = await Class.findByIdAndUpdate(classId, classData, {
        new: true,
      });

      return updatedClass;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  delete: async (classesIds) => {
    try {
      const classesToDelete = await Class.find({ _id: { $in: classesIds } });

      await Class.deleteMany({ _id: { $in: classesIds } });

      await Assistance.deleteMany({ class: { $in: classesIds } });

      return classesToDelete;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  registerAssistance: async (classId, studentId, date) => {
    try {
      const classToUpdate = await Class.findById(classId);
      if (!classToUpdate) {
        throw { statusCode: 404, message: "Class not found" };
      }

      const studentToRegister = await Student.findById(studentId);
      if (!studentToRegister) {
        throw { statusCode: 404, message: "Student not found" };
      }

      const assistanceExists = await Assistance.findOne({
        student: studentId,
        class: classId,
        date,
      });

      if (assistanceExists) {
        throw { statusCode: 400, message: "Assistance already registered" };
      }

      const newAssistance = await Assistance.create({
        student: studentId,
        class: classId,
        date,
      });

      return newAssistance;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  getStudents: async (classId) => {
    try {
      const classStudents = await Student.find({ classes: classId });

      return classStudents;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  addStudent: async (classId, studentsIds) => {
    try {
      const classToUpdate = await Class.findById(classId);

      if (!classToUpdate) {
        throw { statusCode: 404, message: "Class not found" };
      }

      const studentsToAdd = await Student.find({ _id: { $in: studentsIds } });

      if (studentsToAdd.length !== studentsIds.length) {
        throw { statusCode: 404, message: "Student not found" };
      }

      const updatedClass = await Class.findByIdAndUpdate(
        classId,
        { $addToSet: { students: { $each: studentsIds } } },
        { new: true }
      );

      const studentToUpdate = await Student.updateMany(
        { _id: { $in: studentsIds } },
        { $addToSet: { classes: classId } }
      );

      return updatedClass;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  removeStudent: async (classId, students) => {
    try {
      const foundClass = await Class.findById(classId);

      if (!foundClass) {
        throw { statusCode: 404, message: "Class not found" };
      }

      await Student.updateMany(
        { _id: { $in: students } },
        { $pull: { classes: classId } }
      );

      const classStudents = await Student.find({ classes: classId });

      return classStudents;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  getAssistances: async (classId) => {
    try {
      const classFound = await Class.findById(classId);

      if (!classFound) {
        throw { statusCode: 404, message: "Class not found" };
      }

      const assistances = await Assistance.find({ class: classId });

      return assistances;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  getAssistanceById: async (classId, assistanceId) => {
    try {
      const classFound = await Class.findById(classId);

      if (!classFound) {
        throw { statusCode: 404, message: "Class not found" };
      }

      const assistance = await Assistance.findOne({
        class: classId,
        _id: assistanceId,
      });

      if (!assistance) {
        throw { statusCode: 404, message: "Assistance not found" };
      }

      return assistance;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  createAssistance: async (classId, date) => {
    try {
      const classToUpdate = await Class.findById(classId);

      if (!classToUpdate) {
        throw { statusCode: 404, message: "Class not found" };
      }

      const assistanceExists = await Assistance.findOne({
        class: classId,
        date,
      });

      if (assistanceExists) {
        throw { statusCode: 400, message: "Assistance already created" };
      }

      const newAssistance = await Assistance.create({
        class: classId,
        date,
      });

      return newAssistance;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },

  deleteAssistance: async (classId, assistances) => {
    try {
      const classFound = await Class.findById(classId);

      if (!classFound) {
        throw { statusCode: 404, message: "Class not found" };
      }

      await Assistance.deleteMany({ _id: { $in: assistances } });

      const records = await Assistance.find({ class: classId });

      return records;
    } catch (error) {
      throw { statusCode: 500, message: error.message };
    }
  },
};
