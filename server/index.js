const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const FormDataModel = require("./models/FormData");
const Post = require("./models/createPostFormData");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key";

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/userAuth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Register User
app.post("/register", async (req, res) => {
  try {
    const {
      role,
      firstName,
      lastName,
      email,
      password,
      country,
      state,
      instruments,
      description,
    } = req.body;

    const existingUser = await FormDataModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new FormDataModel({
      userId: new mongoose.Types.ObjectId().toString(),
      role,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      country,
      state,
      instruments: role === "Musician" ? instruments : [],
      description: role === "Artist" ? description : "",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await FormDataModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.userId }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get Logged-in User Info
app.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await FormDataModel.findOne({ userId: decoded.userId }).select(
      "-password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create Post
app.post("/posts", async (req, res) => {
  const { token, message } = req.body;

  if (!token || !message) {
    return res.status(400).json({ message: "Token and message are required" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await FormDataModel.findOne({ userId: decoded.userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPost = new Post({
      userId: user.userId,
      userName: `${user.firstName} ${user.lastName}`,
      message,
    });

    await newPost.save();
    res.status(201).json({ post: newPost });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ dateTime: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Toggle Like/Dislike
app.put("/posts/like/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likedUsers.includes(userId);
    if (alreadyLiked) {
      post.likedUsers = post.likedUsers.filter((id) => id !== userId);
    } else {
      post.likedUsers.push(userId);
    }

    await post.save();
    res.json({ post });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
