const express = require("express");
const multer = require("multer");
const cors = require("cors");

const path = require("path");

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const FormDataModel = require("./models/FormData");
const Post = require("./models/createPostFormData");
const Instrument = require("./models/InstrumentModel");

const app = express();
const PORT = 5000;
const SECRET_KEY = "your_secret_key";

// Configure Multer storage and file naming
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext; // Append timestamp to avoid name collision
    cb(null, filename);
  },
});

// Multer file filter to accept only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const mimeType = fileTypes.test(file.mimetype);
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    return cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB size limit
  },
});

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve uploaded files statically

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

// Update User Info
app.put("/user", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const {
      firstName,
      lastName,
      email,
      password,
      country,
      state,
      description,
    } = req.body;

    const updateData = {
      firstName,
      lastName,
      email,
      country,
      state,
      description,
    };

    // Hash password if it's being changed
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await FormDataModel.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
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

    const alreadyLiked = post.likedUsers.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      // Unlike
      post.likedUsers = post.likedUsers.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // Like
      post.likedUsers.push(userId);
    }

    await post.save();
    res.json({ post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Post
app.delete("/posts/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "You cannot delete this post" });
    }

    // Delete the post using the correct method
    await Post.findByIdAndDelete(post._id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/addnewinstrument", upload.single("image"), async (req, res) => {
  try {
    const {
      instrumentName,
      instrumentDescription,
      amount,
      userId,
      userName,
      address,
      contactNumber,
      status,
      rentedDate,
      expectedReturnDate,
      renterId,
    } = req.body;

    const newInstrument = new Instrument({
      instrumentName,
      instrumentDescription,
      amount,
      image: req.file ? req.file.filename : "", // Store the filename of the uploaded image
      userId,
      userName,
      address,
      contactNumber,
      status,
      rentedDate,
      expectedReturnDate,
      renterId,
    });

    await newInstrument.save();
    res.status(201).json({ message: "Instrument added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add instrument" });
  }
});

app.get("/instruments", async (req, res) => {
  try {
    const instruments = await Instrument.find();
    res.status(200).json(instruments);
  } catch (error) {
    console.error("Error fetching instruments:", error);
    res.status(500).json({ error: "Unable to fetch instruments." });
  }
});

// Get a specific instrument by ID
app.get("/instruments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const instrument = await Instrument.findById(id);

    if (!instrument) {
      return res.status(404).json({ error: "Instrument not found" });
    }

    res.status(200).json(instrument);
  } catch (error) {
    console.error("Error fetching instrument by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/instruments/rent/:id", async (req, res) => {
  const { rentedDate, expectedReturnDate } = req.body;
  const instrumentId = req.params.id;

  try {
    // Extract token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token and extract user information
    const decoded = jwt.verify(token, SECRET_KEY);
    const renterId = decoded.userId; // Get the user ID from the decoded token

    // Find the instrument by ID
    const instrument = await Instrument.findById(instrumentId);
    if (!instrument) {
      return res.status(404).json({ message: "Instrument not found." });
    }

    // Check if the logged-in user is the owner of the instrument
    if (instrument.userId === renterId) {
      return res
        .status(400)
        .json({ message: "You cannot rent your own instrument." });
    }

    // Check if the instrument is available for rent
    if (instrument.status !== "available") {
      return res
        .status(400)
        .json({ message: "Instrument is not available for rent." });
    }

    // Update the instrument status to 'not available' and set rental details
    instrument.status = "not available";
    instrument.rentedDate = rentedDate;
    instrument.expectedReturnDate = expectedReturnDate;
    instrument.renterId = renterId;

    // Save the changes to the instrument
    await instrument.save();

    // Send the success response
    res
      .status(200)
      .json({ message: "Instrument rented successfully!", instrument });
  } catch (error) {
    console.error("Error renting instrument:", error);
    res.status(500).json({ error: "Unable to rent the instrument." });
  }
});

// Update instrument status to available and reset rented details
app.put("/instruments/return/:id", async (req, res) => {
  const instrumentId = req.params.id;

  try {
    // Extract token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the token and extract user information
    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId; // Get the user ID from the decoded token

    // Find the instrument by ID
    const instrument = await Instrument.findById(instrumentId);
    if (!instrument) {
      return res.status(404).json({ message: "Instrument not found." });
    }

    // Check if the logged-in user is the renter of the instrument
    if (instrument.renterId !== userId) {
      return res
        .status(400)
        .json({ message: "You are not the renter of this instrument." });
    }

    // Reset rented details and update status to "available"
    instrument.status = "available";
    instrument.rentedDate = "";
    instrument.expectedReturnDate = "";
    instrument.renterId = "";

    // Save the changes to the instrument
    await instrument.save();

    // Send the success response
    res.status(200).json({
      message: "Instrument returned and status updated to available!",
      instrument,
    });
  } catch (error) {
    console.error("Error updating instrument status:", error);
    res.status(500).json({ error: "Unable to return the instrument." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
