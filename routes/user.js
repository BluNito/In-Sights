const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const keys = require("../config/keys");

//Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

//Load user models
const User = require("../models/Users");
const isEmpty = require("../validation/is-empty");

// @route   POST api/users/register
// @desc    Register user
// @access  public
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    try {
      const [user1, user2] = await Promise.all([
        User.findOne({ email: req.body.email }),
        User.findOne({ username: req.body.username }),
      ]);
      if (user1) {
        return res.status(400).json({ email: "Email already exists" });
      } else if (user2) {
        return res.status(400).json({ username: "Username taken" });
      } else {
        const newUser = new User({
          fname: req.body.fname,
          lname: req.body.lname,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        const Salt = await bcrypt.genSalt(10);
        const cryptedPass = await bcrypt.hash(newUser.password, Salt);
        newUser.password = cryptedPass;
        newUser.save().then((user) => {
          const payload = { id: user.id, clearance: 1 };
          jwt.sign(payload, keys.mainKey, { expiresIn: "7d" }, (err, token) => {
            if (err) throw err;
            res.json({
              token: `Bearer ${token}`,
              id: user.id,
              fname: user.fname,
              lname: user.lname,
            });
          });
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ register: "An error has occurred" });
    }
  }
});

// @route   POST api/users/login
// @desc    Login user
// @access  public
router.post("/login", async (req, res) => {
  const { errors, isValid, isEmail } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    try {
      const { username, password } = req.body;
      let user;
      if (isEmail) {
        user = await User.findOne({ email: username });
      } else {
        user = await User.findOne({ username });
      }
      if (!user) return res.status(400).json({ login: "User not found" });
      else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const payload = { id: user.id, clearance: 1 };
          jwt.sign(payload, keys.mainKey, { expiresIn: "7d" }, (err, token) => {
            if (err) throw err;
            res.json({
              token: `Bearer ${token}`,
              id: user.id,
              fname: user.fname,
              lname: user.lname,
            });
          });
        } else {
          return res.status(400).json({ login: "Incorrect password" });
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: "An error has occurred" });
    }
  }
});

module.exports = router;
