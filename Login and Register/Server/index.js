const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const UserModel = require("./models/User");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: ["http://localhost:5173"], // Ensure this is the correct frontend port
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware to parse cookies
app.use(cookieParser());

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://localhost:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Middleware to verify user
const varifyUser = (req, res, next) => {
  const token = req.cookies.token; // Corrected to req.cookies
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decode) => {
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

app.get('/dashboard', varifyUser, (req, res) => {
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
    const user = await UserModel.create({ name, email, password: hash });
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
          "jwt-secret-key",
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
app.listen(3001, () => {
  console.log("Server is Running on port 3001");
});
