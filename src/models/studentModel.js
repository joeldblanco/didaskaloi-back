const mongoose = require("mongoose");
const studentSchema = require("../schemas/studentSchema");
const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
