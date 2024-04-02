const mongoose = require("mongoose");
const assistanceSchema = require("../schemas/assistanceSchema");
const Assistance = mongoose.model("Assistance", assistanceSchema);

module.exports = Assistance;
