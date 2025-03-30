// index.js (Backend)

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const FormDataModel = require("./models/FormData");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/practice_mern");

app.post("/register", async (req, res) => {
  try {
    const { email, role } = req.body;
    const existingUser = await FormDataModel.findOne({ email });

    if (existingUser) {
      return res.json("Already registered");
    }

    const newUser = await FormDataModel.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await FormDataModel.findOne({ email });

    if (!user) {
      return res.json("No records found!");
    }

    if (user.password === password) {
      return res.json("Success");
    } else {
      return res.json("Wrong password");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("Server listening on http://127.0.0.1:3001");
});
