const mongoose = require("mongoose");

const dbCon = async () => {
  await mongoose.connect(
    `mongodb+srv://joeldblanco:sD6JllDEkClJj049@test.f1vqfui.mongodb.net/didaskaloi?retryWrites=true&w=majority&appName=didaskaloi`
  );
};

module.exports = dbCon;
