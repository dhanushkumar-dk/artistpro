const express = require("express");
const multer = require("multer");
const cors = require("cors");
const nodemailer = require("nodemailer");
const { Server } = require("socket.io");
const http = require("http");

const path = require("path");

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const FormDataModel = require("./models/FormData");
const Event = require("./models/eventModel");
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

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Optional: log connections
io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Make `io` accessible in routes
app.set("io", io);

// mongoose.connect("mongodb://127.0.0.1:27017/ArtistCollab", {
mongoose.connect(
  "mongodb+srv://admin:dhanush123@cluster0.se9w4fs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// -------------------------------------------------
// -------------------------------------------------
// -------------------------------------------------
const myemail = "@gmail.com";
const mypass = "16digit";

// -------------------------------------------------
// -------------------------------------------------
// -------------------------------------------------
const otpStore = {}; // In-memory OTP store (better to use DB or cache like Redis)

app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = otp;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myemail,
      pass: mypass,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// -------------------------------------------------
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] === otp) {
    delete otpStore[email]; // Invalidate OTP after use
    return res.status(200).json({ verified: true });
  }

  return res.status(400).json({ verified: false, message: "Invalid OTP" });
});

// -------------------------------------------------

app.post("/check-email", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const userExists = await FormDataModel.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
    res.status(200).json({ message: "Email available" });
  } catch (err) {
    console.error("Email check error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------------------------------------
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: myemail,
      pass: mypass,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// -------------------------------------------------

app.get("/event/:id/booked-users", async (req, res) => {
  try {
    const eventId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    // Fetch event and populate bookeduser array with selected fields
    const event = await Event.findById(eventId).populate({
      path: "bookeduser",
      select: "firstName lastName email phone",
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // bookeduser will be an array of user objects
    res.status(200).json({
      success: true,
      bookedUsers: event.bookeduser,
    });
  } catch (error) {
    console.error("Error fetching booked users:", error);
    res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
});
// -------------------------------------------------

// Register User
app.post("/register", async (req, res) => {
  try {
    const {
      role,
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
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
      phone,
      address,
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

app.get("/usernames", async (req, res) => {
  try {
    // Fetch all users and extract only firstName and lastName (or combine them as a full name)
    const users = await FormDataModel.find().select("firstName lastName");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Map the users to an array of full names
    const usernames = users.map((user) => `${user.firstName} ${user.lastName}`);

    res.json(usernames);
  } catch (error) {
    console.error("Error fetching usernames:", error);
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

app.post("/addevent", upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      genre,
      host,
      date,
      description,
      location,
      userId,
      slots,
      link,
      bookeduser = [], // Default to an empty array if not provided
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !genre ||
      !host ||
      !date ||
      !description ||
      !location ||
      !userId ||
      !slots ||
      !link
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    // Create the event object
    const newEvent = new Event({
      name,
      genre,
      host,
      date,
      description,
      location,
      userId,
      slots,
      bookeduser,
      link,
      image: req.file ? req.file.filename : null, // Handle the image upload
    });

    // Save the new event to the database
    await newEvent.save();
    res.status(201).json({ success: true, event: newEvent });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ success: false, message: "Failed to add event" });
  }
});

// GET /eventsdata - Fetch all events
// Fetch all events with populated userId and bookeduser references
app.get("/eventsdata", async (req, res) => {
  try {
    // Fetch all events and populate the userId and bookeduser fields
    const events = await Event.find(); // populate bookeduser (e.g., name, email)

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No events found" });
    }

    // Send back the events data
    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: `Failed to fetch events: ${error.message}`,
    });
  }
});

// =========================================================================================================================

// Get a single event by ID
app.get("/eventsdata/:id", async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find event by ID
    const event = await Event.findById(eventId); // You can also populate fields if needed

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      success: false,
      message: `Failed to fetch event: ${error.message}`,
    });
  }
});

// RSVP to an event
app.post("/eventsdata/:id/rsvp", async (req, res) => {
  const eventId = req.params.id;
  const { userId } = req.body;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    // Check if user already RSVP'd
    if (event.bookeduser.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "User already RSVP'd" });
    }

    event.bookeduser.push(userId);
    await event.save();

    res.status(200).json({ success: true, message: "RSVP successful", event });
  } catch (error) {
    console.error("Error RSVPing:", error);
    res.status(500).json({ success: false, message: error.message });
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

// Create Post with Socket.IO emit
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

    // Emit new post to all connected clients
    const io = req.app.get("io");
    io.emit("newPost", newPost);

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

// Like/Unlike a post
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

    // Emit the updated post to clients
    const io = req.app.get("io");
    io.emit("updatePost", post);

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

    await Post.findByIdAndDelete(post._id);

    // Emit the post deletion event with the post ID
    const io = req.app.get("io");
    io.emit("deletePost", post._id);

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
      category,
      amount,
      userId,
      userName,
      address,
      contactNumber,
      status,
      rentedDate,
      expectedReturnDate,
      renterId,
      renterMobile,
      renterEmail,
      renterAddress,
    } = req.body;

    // Basic required field check
    if (!instrumentName || !category || !userId || !userName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const image = req.file?.filename || "";

    const newInstrument = new Instrument({
      instrumentName,
      instrumentDescription,
      category,
      amount,
      image,
      userId,
      userName,
      address,
      contactNumber,
      status,
      rentedDate,
      expectedReturnDate,
      renterId,
      renterMobile,
      renterEmail,
      renterAddress,
    });

    await newInstrument.save();

    res.status(201).json({ message: "Instrument added successfully!" });
  } catch (err) {
    console.error("Error adding instrument:", err);
    res.status(500).json({ error: "Failed to add instrument" });
  }
});

app.get("/instruments", async (req, res) => {
  try {
    const instruments = await Instrument.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(instruments);
  } catch (err) {
    console.error("Error fetching instruments:", err);
    res.status(500).json({ error: "Failed to fetch instruments" });
  }
});

// Get a specific instrument by ID
app.get("/instruments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const instrument = await Instrument.findById(id);

    if (!instrument) {
      return res.status(404).json({ error: "Instrument not found" });
    }

    res.status(200).json(instrument);
  } catch (err) {
    console.error("Error fetching instrument by ID:", err);
    res.status(500).json({ error: "Failed to fetch instrument" });
  }
});

app.put("/instruments/rent/:id", async (req, res) => {
  const instrumentId = req.params.id;

  const {
    rentedDate,
    expectedReturnDate,
    renterId,
    renterMobile,
    renterEmail,
    renterAddress,
  } = req.body;

  try {
    // Token verification for authentication
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, SECRET_KEY); // Authentication only

    // Find instrument
    const instrument = await Instrument.findById(instrumentId);
    if (!instrument) {
      return res.status(404).json({ message: "Instrument not found" });
    }

    // Prevent owner from renting their own instrument
    if (instrument.userId === renterId) {
      return res
        .status(400)
        .json({ message: "You cannot rent your own instrument." });
    }

    // Check availability
    if (instrument.status !== "available") {
      return res
        .status(400)
        .json({ message: "Instrument is not available for rent." });
    }

    // Update instrument rental details
    instrument.status = "not available";
    instrument.rentedDate = rentedDate;
    instrument.expectedReturnDate = expectedReturnDate;
    instrument.renterId = renterId;
    instrument.renterMobile = renterMobile;
    instrument.renterEmail = renterEmail;
    instrument.renterAddress = renterAddress;

    await instrument.save();

    res.status(200).json({
      message: "Instrument rented successfully!",
      instrument,
    });
  } catch (error) {
    console.error("Error renting instrument:", error);
    res.status(500).json({ error: "Unable to rent the instrument." });
  }
});

// Update instrument status to available and reset rented details
app.put("/instruments/return/:id", async (req, res) => {
  const instrumentId = req.params.id;

  try {
    // Get token and verify
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.userId;

    // Fetch instrument
    const instrument = await Instrument.findById(instrumentId);
    if (!instrument) {
      return res.status(404).json({ message: "Instrument not found." });
    }

    // Ensure user is the renter
    if (instrument.renterId !== userId) {
      return res
        .status(403)
        .json({ message: "You are not the renter of this instrument." });
    }

    // Reset rental status
    instrument.status = "available";
    instrument.rentedDate = null;
    instrument.expectedReturnDate = null;
    instrument.renterId = null;
    instrument.renterMobile = null;
    instrument.renterEmail = null;
    instrument.renterAddress = null;

    await instrument.save();

    res.status(200).json({
      message: "Instrument returned successfully and marked as available.",
      instrument,
    });
  } catch (error) {
    console.error("Error returning instrument:", error);
    res.status(500).json({ error: "Unable to return the instrument." });
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
