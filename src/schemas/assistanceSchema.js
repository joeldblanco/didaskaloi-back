const { Schema } = require("mongoose");

const assistanceSchema = new Schema({
  class: {
    type: Schema.Types.ObjectId,
    ref: "Class",
  },
  date: {
    type: String,
  },
});

module.exports = assistanceSchema;
