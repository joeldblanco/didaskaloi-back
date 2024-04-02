const { Schema } = require("mongoose");

const classSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = classSchema;
