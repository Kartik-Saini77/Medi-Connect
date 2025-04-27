const express = require('express');
const app = express();
const port = 3000;
const userModel = require("./models/user");
const reqModel = require("./models/req");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:1234", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.post('/create', async (req, res) => {
  try {
    const { username, name, email, password, phone } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      name,
      email,
      password: hash,
      phone
    });

    const token = jwt.sign({ email: user.email, userid: user._id }, "secretkey");
    res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });
    res.status(200).json({ message: "User created successfully", token });

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

    const result = await bcrypt.compare(password, user.password);

    if (result) {
      const token = jwt.sign({ email: user.email, userid: user._id }, "secretkey");
      res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
});


app.get('/logout', (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});


function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const data = jwt.verify(token, "secretkey");
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}


app.post('/become-volunteer', isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === 'volunteer') {
      return res.status(400).json({ message: "You are already a volunteer" });
    }

    user.role = 'volunteer';
    await user.save();

    res.status(200).json({ message: "Successfully became a volunteer" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating role" });
  }
});


app.get('/requests', isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.userid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== 'volunteer') {
      return res.status(403).json({ message: "Access forbidden, you must be a volunteer to view requests" });
    }


    const requests = await reqModel.find().populate('user', 'username phone').sort({ submittedAt: -1 });

    
    console.log(requests);

    res.status(200).json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching requests" });
  }
});



app.post('/requests', isLoggedIn, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const user = await userModel.findOne({ _id: req.user.userid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newRequest = await reqModel.create({ user: user._id, content, status: 'pending', submittedAt: new Date() });
    user.requests.push(newRequest._id);
    await user.save();

    res.status(200).json({ message: "Request submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting request" });
  }
});


app.post('/requests/update-status', isLoggedIn, async (req, res) => {
  try {
    const { requestId, status } = req.body;
    
    const request = await reqModel.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = status;
    await request.save();
    
    res.status(200).json({ message: "Request status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating request status" });
  }
});

app.post('/requests/delete', isLoggedIn, async (req, res) => {
  try {
    const { requestId } = req.body;
    await reqModel.findByIdAndDelete(requestId);
    res.status(200).json({ message: "Request deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting request" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
