// models/FormData.js

const mongoose = require("mongoose");

const FormDataSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Added userId
  role: { type: String, required: true }, // Musician, Artist, User
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  instruments: { type: [String], default: [] }, // Only for musicians
  description: { type: String, default: "" }, // Only for artists
});

const FormDataModel = mongoose.model("log_reg_form", FormDataSchema);

module.exports = FormDataModel;
