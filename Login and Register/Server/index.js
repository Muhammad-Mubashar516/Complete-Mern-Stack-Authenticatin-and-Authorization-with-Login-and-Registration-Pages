const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const UserModel = require("./models/User");

dotenv.config(); // <-- .env file load karega

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: ["http://localhost:5173"], // yahan apni frontend URL rakhna
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// ✅ Connect to MongoDB Atlas using .env MONGO_URI
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ Could not connect to MongoDB:", err));

// Middleware to verify user
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(403).json({ message: "Error with token" });
      } else {
        if (decode.role === "admin") {
          next();
        } else {
          return res.status(403).json({ message: "Not admin" });
        }
      }
    });
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  res.json({ message: "Success" });
});

// Route for user registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email or name already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    await UserModel.create({ name, email, password: hash });
    res.json({ status: "OK" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Route for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        res.cookie("token", token, { httpOnly: true });
        return res.json({ status: "Success", role: user.role });
      } else {
        return res.status(401).json("The password is incorrect");
      }
    } else {
      return res.status(404).json("No record existed");
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is Running on port ${PORT}`);
});
