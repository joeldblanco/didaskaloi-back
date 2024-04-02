const mongoose = require("mongoose");
const classSchema = require("../schemas/classSchema");
const Class = mongoose.model("Class", classSchema);

module.exports = Class;
