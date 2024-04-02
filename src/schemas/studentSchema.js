const { Schema } = require("mongoose");

const studentSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  records: [
    {
      type: Schema.Types.ObjectId,
      ref: "Assistance",
    },
  ],
});

module.exports = studentSchema;
