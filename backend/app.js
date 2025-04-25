const express = require('express');
const app = express();
const port = 3000;

const userModel = require("./models/user");
const reqModel = require("./models/req");

const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:1234", // Your React frontend port
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes

app.post('/create', async (req, res) => {
  try {
    const { username, name, email, password, phone } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({ message: "Error generating salt" });

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        const user = await userModel.create({
          username,
          name,
          email,
          password: hash,
          phone
        });

        const token = jwt.sign({ email: user.email, userid: user._id }, "secretkey");
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "User created successfully", token });
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while registering user" });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json({ message: "Error comparing passwords" });

      if (result) {
        const token = jwt.sign({ email: user.email, userid: user._id }, "secretkey");
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

app.post('/requests', isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const { content } = req.body;

    const newRequest = await reqModel.create({
      user: user._id,
      content
    });

    user.requests.push(newRequest._id);
    await user.save();

    res.status(200).json({ message: "Request submitted" });
  } catch (err) {
    res.status(500).json({ message: "Error submitting request" });
  }
});

app.post('/requests/delete', isLoggedIn, async (req, res) => {
  try {
    const { requestId } = req.body;
    await reqModel.findByIdAndDelete(requestId);
    res.status(200).json({ message: "Request deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request" });
  }
});

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const data = jwt.verify(token, "secretkey");
    req.user = data;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

// Server Start
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
