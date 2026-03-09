const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  jobName: {
    type: String,
    required: true,
  },
  exp: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String], // array
    required: true,
  },
  tags: {
    type: [String], // 🔥 array of strings
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("admin", adminSchema);
