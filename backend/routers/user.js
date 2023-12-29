const express = require('express');
const router = express.Router();
const User = require('../Models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const secretKey = "ayushbhaikyahorahahai"
const fetchuser = require("../middleware/authMiddleware")

// register a new user 
router.post('/createuser', async (req, res) => {
let success = false


  const { userName, name, email, password, pic } = req.body;

  try {
    success = false
    // Check if all required fields are provided
    if (!userName || !name || !email || !password) {
      return res.status(400).json({ error: 'All data is required' });
    }

    // Check if the email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ error: 'This email already exists' });
    }
    success = false


    // Check if the username is available
    const existingUserByUserName = await User.findOne({ userName });
    if (existingUserByUserName) {
      return res.status(400).json({ error: 'Username not available' });
    }
    success = false


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      userName,
      name,
      email,
      password: hashedPassword,
      pic,
    });

    const data ={
        user:{
            id:newUser.id
        }
    }
    const authToken = jwt.sign(data,secretKey);
    // Return success response
    res.status(201).json({ success: 'User registered successfully', user: newUser ,authToken});
  } catch (error) {
    // Handle errors
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Login a user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if both email and password are provided
      if (!email || !password) {
        return res.status(400).json({ error: "Both email and password are required" });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // Check if the user exists and the provided password is correct
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
  
      const data ={
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data,secretKey);
  
      // Return success response or token
      res.status(200).json({ success: "Login successful", user ,authToken});
    } catch (error) {
      // Handle errors
      console.error('Error during user login:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  router.get("/", fetchuser, async (req, res) => {
    try {
      const keyword = req.query.search
        ? {
            $or: [
              { userName: { $regex: req.query.search, $options: "i" } },
            ],
          }
        : {};
  
      const users = await User.find(keyword).where({ _id: { $ne: req.user.id }});
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });


module.exports = router;
