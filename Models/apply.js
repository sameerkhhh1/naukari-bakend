const mongoose = require("mongoose");
const applySchema = new mongoose.Schema({
  jobName: String,
  location: String,
  salary: Number,
  exp: String,
  role: String,
  description: String,

  companyName: String,
  tags: {
    type: [String], // 🔥 array of strings
  },
  skills: {
    type: [String], // array
  },
});
module.exports = mongoose.model("apply", applySchema);
