const express = require('express');
const app = express();
const port = 3000;
const userModel = require("./models/user");
const reqModel = require("./models/req");
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/login', (req, res) => {
  res.render("login");
});

app.get('/issues', isLoggedIn, (req, res) => {
  res.render("issues");
});

app.get('/requests', isLoggedIn, async (req, res) => {
  let requests = await reqModel.find().populate('user', 'username phone');
  res.render("requests", { requests });
});

app.post('/create', async (req, res) => {
  let { username, name, email, password, phone } = req.body;
  
  let user = await userModel.findOne({ email });
  if (user) return res.status(400).send("User already exists");
  
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return res.status(500).send("Error generating salt");
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).send("Error hashing password");
      let user = await userModel.create({
        username,
        name,
        email,
        password: hash,
        phone
      });
      let token = jwt.sign({ email: email, userid: user._id }, "secretkey");
      res.cookie("token", token);
      res.redirect("/issues");
      console.log(user);
    });
  });
});

app.post('/login', async (req, res) => {
  let { email, password } = req.body;
  
  let user = await userModel.findOne({ email });
  if (!user) return res.status(400).send("something went wrong");
  
  bcrypt.compare(password, user.password, function(err, result) {
    if (err) return res.status(500).send("Error comparing passwords");
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "secretkey");
      res.cookie("token", token);
      res.status(200).redirect("/issues");
    } else {
      res.redirect("/login");
    }
  });
});

app.get('/logout', (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.post('/requests', isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  
  let newRequest = await reqModel.create({
    user: user._id,
    content
  });
  user.requests.push(newRequest._id);
  await user.save();
  res.redirect("/requests");
});

app.post('/requests/delete', isLoggedIn, async (req, res) => {
  let { requestId } = req.body;
  await reqModel.findByIdAndDelete(requestId);
  res.redirect("/requests");
});

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") {
    res.redirect("/login");
  } else {
    let data = jwt.verify(req.cookies.token, "secretkey");
    req.user = data;
    next();
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
